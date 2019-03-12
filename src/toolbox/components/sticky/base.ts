import {NumericRange} from "../../utils/math/numeric-range";
import {getVisibleYPosition} from "../../utils/dom/position/vertical/get-visible-y-position";
import {renderLoop} from "../../utils/render-loop";
import {getOffsetFromAncestor} from "../../utils/dom/position/get-offset-from-ancestor";
import {Dimensions} from "../../utils/cached-vectors/dimensions";

type TPositionFunction = (rv: StickyRunValue) => void;

const windowDimensions = Dimensions.getSingleton();

class StickyRunValue {
  public readonly target: HTMLElement;
  public readonly containerXOffset: number;
  public readonly maxDistance: number;

  constructor(
    target: HTMLElement, containerXOffset: number, maxDistance: number
  ) {
    this.target = target;
    this.containerXOffset = containerXOffset;
    this.maxDistance = maxDistance;
  }
}

/**
 * Simulates `position: sticky` when native support isn't available due to
 * `overflow: hidden` on parent elements.
 */
class Sticky {
  private readonly container_: HTMLElement;
  private readonly target_: HTMLElement;
  private destroyed_: boolean;
  private lastPositionFunction_: TPositionFunction;

  /**
   * @param target The Element to position as if it were "position: sticky"'d
   *
   *
   * @param container Element to treat as the target's offset parent.
   *
   * Essentially the element that the target should be sticky'd to.
   */
  constructor (target: HTMLElement, container: HTMLElement) {
    this.container_ = container;
    this.target_ = target;
    this.lastPositionFunction_ = null;
    this.destroyed_ = false;
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => this.measure_());
    this.renderLoop_();
  }

  private renderLoop_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.renderLoop_());
      this.measure_()
    });
  }

  private static getPositionFunction_(
    shouldPin: boolean,
    yPosition: number
  ): TPositionFunction {
    if (shouldPin) {
      return Sticky.positionMiddle_;
    } else if (yPosition < 0) {
      return Sticky.positionBottom_;
    } else {
      return Sticky.positionTop_;
    }
  }

  // Split out so it can be run on initial load
  private measure_(): void {
    if (this.destroyed_) {
      return;
    }

    const yPosition: number = getVisibleYPosition(this.container_);
    const maxDistance: number =
      this.container_.offsetHeight -
      this.target_.offsetHeight -
      this.target_.offsetTop;
    const shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
    const positionFunction = Sticky.getPositionFunction_(shouldPin, yPosition);

    // Skip duplicating work
    if (
      this.lastPositionFunction_ === positionFunction &&
      !windowDimensions.hasChanged()
    ) {
      return;
    }

    const containerXOffset: number =
      getOffsetFromAncestor(this.container_, null).x;

    renderLoop.anyMutate(() => {
      positionFunction(
        new StickyRunValue(this.target_, containerXOffset, maxDistance));
      this.lastPositionFunction_ = positionFunction;
    });
  }

  private static positionTop_(runValue: StickyRunValue): void {
    runValue.target.style.position = '';
    runValue.target.style.transform = '';
  }

  private static positionMiddle_(runValue: StickyRunValue): void {
    runValue.target.style.position = 'fixed';
    runValue.target.style.transform =
      `translateX(${runValue.containerXOffset}px)`;
  }

  private static positionBottom_(runValue: StickyRunValue): void {
    runValue.target.style.position = 'absolute';
    runValue.target.style.transform = `translateY(${runValue.maxDistance}px)`;
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {Sticky};
