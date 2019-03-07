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
  private static positionFnMap_ =
    new Map<Symbol, (rv: StickyRunValue) => void>([
      [ContainerPosition.TOP, Sticky.positionTop_],
      [ContainerPosition.MIDDLE, Sticky.positionMiddle_],
      [ContainerPosition.BOTTOM, Sticky.positionBottom_],
    ]);


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

    const yPosition: number = getVisibleYPosition(this.container_);
    const maxDistance: number =
      this.container_.offsetHeight -
      this.target_.offsetHeight -
      this.target_.offsetTop;
    const shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
    const position = this.getPosition_(shouldPin, yPosition);

    // Skip duplicating work
    if (this.lastPosition_ === position) {
      return;
    }

    const containerXOffset: number =
      getOffsetFromAncestor(this.container_, null).x;

    renderLoop.anyMutate(() => {
      Sticky.positionFnMap_.get(position)(
        new StickyRunValue(this.target_, containerXOffset, maxDistance));
      this.lastPosition_ = position;
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
