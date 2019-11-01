import {renderLoop} from "../../utils/render-loop";
import {Scroll} from "../../utils/cached-vectors/scroll";
import {NumericRange} from "../../utils/math/numeric-range";
import {SmoothScrollService} from "../smooth-scroll/smooth-scroll-service";
import {DynamicDefaultMap} from "../../utils/map/dynamic-default";
import {SCROLL_ELEMENT} from "../../utils/dom/position/scroll-element";
import {getVisibleDistanceBetweenElementsIgnoringSticky} from "../../utils/dom/position/vertical/get-visible-distance-between-elements-ignoring-sticky";
import {clear} from "../../utils/array/clear";
import {spliceFirstInstance} from "../../utils/array/splice-first-instance";
import {insert} from "../../utils/array/insert";
import {max} from "../../utils/array/max";


// Handles nested scroll-jack coordinators
class PoliteScrollJackCoordinator {
  private static singleton_:
    DynamicDefaultMap<Element, PoliteScrollJackCoordinator> =
    DynamicDefaultMap.usingFunction(
      (scrollContainer) => new PoliteScrollJackCoordinator(scrollContainer));

  private readonly scroll_: Scroll;
  private readonly rangesByStart_: NumericRange[];
  private readonly rangesByEnd_: NumericRange[];
  private readonly elementsToRanges_: Map<Element, NumericRange>;
  private readonly rangesToElements_: Map<NumericRange, Element>;
  private readonly scrollContainer_: Element;
  private readonly elements_: HTMLElement[]; // Array to allow for duplicates
  private readonly calculatedElements_: Set<HTMLElement>;

  private lastScrollDelta_: number;
  private scrollJackTimeout_: number;
  private lastScrollJackTime_: number;
  private delay_: number;
  private smoothScrollService_: SmoothScrollService;
  private startPosition_: number;

  constructor(scrollContainer: Element = null) {
    this.scrollContainer_ = scrollContainer;

    this.lastScrollDelta_ = 0;
    this.scrollJackTimeout_ = null;
    this.lastScrollJackTime_ = 0;
    this.scroll_ = Scroll.getSingleton();
    this.elements_ = [];
    this.rangesByStart_ = [];
    this.rangesByEnd_ = [];
    this.elementsToRanges_ = new Map();
    this.rangesToElements_ = new Map();
    this.calculatedElements_ = new Set();
    this.delay_ = 150;
    this.smoothScrollService_ = SmoothScrollService.getSingleton();
    this.startPosition_ = null;
    this.runLoop_();
  }

  private calculateRanges_() {
    clear(this.rangesByStart_); // Clear rather than re-assign to avoid GC
    clear(this.rangesByEnd_); // Clear rather than re-assign to avoid GC
    this.calculatedElements_.clear();
    this.elementsToRanges_.clear();
    this.rangesToElements_.clear();
    this.elements_.forEach((element) => this.calculateRange_(element));
  }

  private calculateRange_(element: HTMLElement) {
    if (this.calculatedElements_.has(element)) {
      return; // Don't calculate a range twice
    }

    this.calculatedElements_.delete(element);
    const start =
      getVisibleDistanceBetweenElementsIgnoringSticky(
        element, <HTMLElement>this.scrollContainer_);
    const end = start + element.offsetHeight;
    const range = new NumericRange(start, end);
    this.elementsToRanges_.set(element, range);
    this.rangesToElements_.set(range, element);

    // TODO(amacdonald): Create function to insert by score/value fn using
    // binary search to find the right place.
    if (this.rangesByStart_.length === 0) {
      this.rangesByStart_.push(range);
    } else {
      for (let j = 0; j < this.rangesByStart_.length; j++) {
        if (this.rangesByStart_[j].getMin() > range.getMin()) {
          insert(this.rangesByStart_, range, j);
          break;
        } else if (j === this.rangesByStart_.length - 1) {
          this.rangesByStart_.push(range);
          break;
        }
      }
    }

    if (this.rangesByEnd_.length === 0) {
      this.rangesByEnd_.push(range);
    } else {
      for (let i = 0; i < this.rangesByEnd_.length; i++) {
        if (this.rangesByEnd_[i].getMax() > range.getMax()) {
          insert(this.rangesByEnd_, range, i);
          break;
        } else if (i === this.rangesByEnd_.length - 1) {
          this.rangesByEnd_.push(range);
          break;
        }
      }
    }
  }

  public registerElement(element: HTMLElement): void {
    this.calculateRange_(element);
    this.elements_.push(element);
  }

  public registerElements(elements: HTMLElement[]): void {
    elements.forEach((element) => this.registerElement(element));
  }

  public deregisterElement(element: HTMLElement): void {
    const index = this.elements_.indexOf(element);
    if (index === -1) {
      return;
    }

    this.elements_.splice(index, 1);
    const followUpIndex = this.elements_.indexOf(element);

    if (followUpIndex === -1) {
      this.calculatedElements_.delete(element);
      const range = this.elementsToRanges_.get(element);
      this.elementsToRanges_.delete(element);
      this.rangesToElements_.delete(range);

      spliceFirstInstance(this.rangesByStart_, range);
      spliceFirstInstance(this.rangesByEnd_, range);
    }
  }

  public deregisterElements(elements: HTMLElement[]): void {
    elements.forEach((element) => this.deregisterElement(element));
  }

  private runLoop_(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.runLoop_());

      this.calculateRanges_(); // Setup cache values

      // Do nothing if we're already scroll-jacking
      if (this.smoothScrollService_.isScrolling()) {
        console.log('Doing nothing, ongoing jacking');
        return;
      }

      // Do nothing if we're not really scrolling
      if (this.scroll_.getDelta().getY() === 0) {
        console.log('Doing nothing, no delta');
        return;
      }

      if (this.startPosition_ === null) {
        this.startPosition_ =
          this.scroll_.getY() - this.scroll_.getDelta().getY();
      }

      this.clearScrollJackTimeout_();
      this.scrollJackTimeout_ =
        window.setTimeout(() => this.scrollJack_(), this.delay_);
    });
  }

  private scrollJack_(): void {
    this.smoothScrollService_.scrollToY(this.getScrollJackTarget_());
    this.startPosition_ = null;
  }

  private getScrollJackTarget_(): number {
    const position = this.scroll_.getY();
    const isDownFromStart = position > this.startPosition_;

    if (position === this.startPosition_) {
      console.log('No position change');
      return position; // Do nothing if we haven't moved.
    }

    const focusedRange = this.getFocusedRange_();

    if (!focusedRange || this.isFillingView_(focusedRange)) {
      console.log('No focused range or is filling view', focusedRange);
      return position; // Do nothing
    }

    const endedScrollingDown = this.scroll_.isScrollingDown();

    const startRange = this.getStartFocusedRange_();

    const visibleRanges = this.getVisibleRanges_();
    const startRangeIndex = visibleRanges.indexOf(startRange);
    const rangesAfter = visibleRanges.slice(startRangeIndex + 1);
    const rangesAfterShowingTop =
      this.rangesByStart_.filter((range) => this.isTopVisible_(range));
    const rangesBefore = visibleRanges.slice(0, startRangeIndex);
    const rangesBeforeShowingBottom =
      rangesBefore.filter((range) => this.isBottomVisible_(range));

    if (isDownFromStart) {
      if (endedScrollingDown) {
        if (
          this.startedWithFocusedRangeBottomVisible_() &&
          rangesAfterShowingTop.length > 0
        ) {
          return rangesAfterShowingTop[0].getMin();
        } else if (
          // this.getRangeViewportPercent_(startRange) < .5 &&
          this.getRangeSelfPercent_(startRange) < 1 &&
          rangesAfterShowingTop.length > 0
        ) {
          return rangesAfterShowingTop[0].getMin();
        } else {
          // Do nothing so we don't snap the bottom of the range out of view
          return position;
        }
      } else {
        return this.getMostFocusedRange_(rangesAfter).getMin();
      }
    } else {
      if (!endedScrollingDown) {
        if (
          this.startedWithFocusedRangeTopVisible_() &&
          rangesBeforeShowingBottom.length > 0
        ) {
          return rangesBeforeShowingBottom[0].getMax() - this.getScrollContainerHeight_();
        } else if (
          // this.getRangeViewportPercent_(startRange) < .5 &&
          this.getRangeSelfPercent_(startRange) < 1 &&
          rangesBeforeShowingBottom.length > 0
        ) {
          return rangesBeforeShowingBottom[0].getMax() - this.getScrollContainerHeight_();
        } else {
          // Do nothing so we don't snap the bottom of the range out of view
          return position;
        }
      } else {
        return this.getMostFocusedRange_(rangesBefore).getMax() -
          this.getScrollContainerHeight_();
      }
    }
  }

  private getRangeViewportPercent_(
    range: NumericRange,
    position: number = null
  ): number {
    const viewportRange = this.getViewportRange_(position);

    return viewportRange.getOverlap(range).getDistance() /
      viewportRange.getDistance();
  }

  private getRangeSelfPercent_(
    range: NumericRange,
    position: number = null
  ): number {
    const viewportRange = this.getViewportRange_(position);

    return viewportRange.getOverlap(range).getDistance() / range.getDistance();
  }

  private getVisibleRanges_(position: number = null): NumericRange[] {
    const viewportRange = this.getViewportRange_(position);
    return this.rangesByStart_
      .filter((range) => viewportRange.hasOverlap(range));
  }

  private getViewportRange_(position: number = null) {
    const y = this.getScrollTop_();
    return new NumericRange(y, y + this.getScrollContainerHeight_());
  }

  private getScrollElement_() {
    return this.scrollContainer_ === null ?
      SCROLL_ELEMENT :
      this.scrollContainer_;
  }

  private getScrollTop_() {
    return this.getScrollElement_().scrollTop;
  }

  private getScrollContainerHeight_() {
    return this.getScrollElement_().clientHeight;
  }

  private getMostFocusedRange_(
    ranges: NumericRange[],
    position: number = null
  ): NumericRange {
    const viewportRange = this.getViewportRange_(position);
    const viewportDistance = viewportRange.getDistance();
    return max<NumericRange>(
      ranges,
      (range) => {
        const overlap = viewportRange.getOverlap(range);
        if (overlap === null) {
          return 0;
        } else {
          const divisor = Math.min(viewportDistance, range.getDistance());
          return overlap.getDistance() / divisor;
        }
      });
  }

  private getFocusedRange_(position: number = null): NumericRange {
    console.log(
      this.rangesToElements_.get(this.getMostFocusedRange_(this.getVisibleRanges_(position))),
      this.getVisibleRanges_(position).map((r) => this.rangesToElements_.get(r))
    );
    return this.getMostFocusedRange_(this.getVisibleRanges_(position));
  }

  private getStartFocusedRange_(): NumericRange {
    return this.getFocusedRange_(this.startPosition_);
  }

  private isTopVisible_(range: NumericRange, position: number = null): boolean {
    return this.getViewportRange_(position).contains(range.getMin());
  }

  private startedWithFocusedRangeTopVisible_(): boolean {
    return this.isTopVisible_(
      this.getStartFocusedRange_(), this.startPosition_);
  }

  private isBottomVisible_(
    range: NumericRange,
    position: number = null
  ): boolean {
    return this.getViewportRange_(position).contains(range.getMax());
  }

  private startedWithFocusedRangeBottomVisible_(): boolean {
    return this.isBottomVisible_(
      this.getStartFocusedRange_(), this.startPosition_);
  }

  isFillingView_(range: NumericRange, position: number = null): boolean {
    return range.containsRange(this.getViewportRange_(position));
  }

  private clearScrollJackTimeout_(): void {
    window.clearTimeout(this.scrollJackTimeout_);
    this.scrollJackTimeout_ = null;
  }

  public static getSingleton(
    container: Element = SCROLL_ELEMENT
  ): PoliteScrollJackCoordinator {
    return this.singleton_.get(container);
  }
}

export {PoliteScrollJackCoordinator};
