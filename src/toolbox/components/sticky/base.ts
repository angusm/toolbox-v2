import {NumericRange} from "../../utils/math/numeric-range";
import {getVisibleYPosition} from "../../utils/dom/position/vertical/get-visible-y-position";
import {renderLoop} from "../../utils/render-loop";
import {getOffsetFromAncestor} from "../../utils/dom/position/get-offset-from-ancestor";

/**
 * Positions the the element could be sticking to within the container.
 *
 * How the target element is positioned by sticky will change depending on
 * whether its container is showing its top, middle or bottom most prominently.
 *
 * @hidden
 */
class ContainerPosition {
  public static TOP: Symbol = Symbol('top');
  public static MIDDLE: Symbol = Symbol('middle');
  public static BOTTOM: Symbol = Symbol('bottom');
}

/**
 * Simulates `position: sticky` when native support isn't available due to
 * `overflow: hidden` on parent elements.
 */
class Sticky {
  private readonly container_: HTMLElement;
  private readonly target_: HTMLElement;
  private destroyed_: boolean;
  private lastPosition_: Symbol;

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
    this.lastPosition_ = null;
    this.destroyed_ = false;
    this.init_();
  }

  private init_(): void {
    this.measure_();
    this.renderLoop_();
  }

  private renderLoop_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => this.measure_());
  }

  private getPosition_(shouldPin: boolean, yPosition: number): Symbol {
    if (shouldPin) {
      return ContainerPosition.MIDDLE;
    } else if (yPosition < 0) {
      return ContainerPosition.BOTTOM;
    } else {
      return ContainerPosition.TOP;
    }
  }

  // Split out so it can be run on initial load
  private measure_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollCleanup(() => this.renderLoop_());

    const yPosition: number = getVisibleYPosition(this.container_);
    const maxDistance: number =
      this.container_.offsetHeight -
      this.target_.offsetHeight -
      this.target_.offsetTop;
    const shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
    const position = this.getPosition_(shouldPin, yPosition);
    const containerXOffset: number =
      getOffsetFromAncestor(this.container_, null).x;

    // Skip duplicating work
    if (this.lastPosition_ === position) {
      return;
    }

    renderLoop.scrollMutate(() => {
      // Determine if the target should stick
      if (position === ContainerPosition.TOP) {
        this.positionTop_();
      }
      else if (position === ContainerPosition.MIDDLE) {
        this.positionMiddle_(containerXOffset);
      }
      else if (position === ContainerPosition.BOTTOM) {
        this.positionBottom_(maxDistance);
      }

      this.lastPosition_ = position;
    });
  }

  private positionTop_(): void {
    if (this.lastPosition_ === ContainerPosition.MIDDLE) {
      this.unpin_();
    }
    this.target_.style.transform = '';
  }

  private positionMiddle_(containerXOffset: number): void {
    this.pin_();
    this.target_.style.transform = `translateX(${containerXOffset}px)`;
  }

  private positionBottom_(maxDistance: number): void {
    if (this.lastPosition_ === ContainerPosition.MIDDLE) {
      this.unpin_();
    }
    this.target_.style.transform = `translateY(${maxDistance}px)`;
  }

  private pin_(): void {
    this.target_.style.position = 'fixed';
  }

  private unpin_(): void {
    this.target_.style.position = 'absolute';
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {Sticky};
