import {NumericRange} from "../../utils/math/numeric-range";
import {getVisibleYPosition} from "../../utils/dom/position/vertical/get-visible-y-position";
import {renderLoop} from "../../utils/render-loop";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {getVisibleDistanceBetweenElements} from "../../utils/dom/position/get-visible-distance-between-elements";
import {getVisibleDistanceFromRoot} from "../../utils/dom/position/get-visible-distance-from-root";
import {getCommonPositionedParentElement} from "../../utils/dom/position/get-common-positioned-parent-element";

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
 * Contains values measured from the DOM for sticky updates.
 */
class MeasureValue {
  public readonly position: ContainerPosition;
  public readonly cloneStyle: CSSStyleDeclaration;
  public readonly cloneDistanceFromFrame: Vector2d;
  public readonly cloneDistanceFromRoot: Vector2d;
  public readonly maxDistance: number;

  constructor(
    position: ContainerPosition,
    cloneStyle: CSSStyleDeclaration,
    cloneDistanceFromFrame: Vector2d,
    cloneDistanceFromRoot: Vector2d,
    maxDistance: number
  ) {
    this.position = position;
    this.cloneStyle = cloneStyle;
    this.cloneDistanceFromFrame = cloneDistanceFromFrame;
    this.cloneDistanceFromRoot = cloneDistanceFromRoot;
    this.maxDistance = maxDistance;
  }
}

/**
 * Simulates `position: sticky` when native support isn't available due to
 * `overflow: hidden` on parent elements.
 */
class Sticky2 {
  private readonly container_: HTMLElement;
  private readonly target_: HTMLElement;
  private readonly clone_: HTMLElement;
  private destroyed_: boolean;
  private lastPosition_: ContainerPosition;

  /**
   * @param target The Element to position as if it were "position: sticky"'d
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
    this.clone_ = document.createElement(target.tagName);
    this.init_();
  }

  private init_(): void {
    this.clone_.innerHTML = this.target_.innerHTML;
    this.clone_.style.visibility = 'hidden';
    Array.from(this.target_.classList)
      .forEach((className) => this.clone_.classList.add(className));
    this.container_.insertBefore(this.clone_, this.target_);
    this.target_.style.position = 'absolute';
    this.target_.style.top = '0';
    this.target_.style.left = '0';
    this.target_.style.width = '';
    this.target_.style.height = '';
    this.target_.style.margin = '0';
    this.target_.style.padding = '0';

    this.renderLoop_();
    this.scrollLoop_();
  }

  private static getPosition_(
    shouldPin: boolean, yPosition: number
  ): ContainerPosition {
    if (shouldPin) {
      return ContainerPosition.MIDDLE;
    } else if (yPosition < 0) {
      return ContainerPosition.BOTTOM;
    } else {
      return ContainerPosition.TOP;
    }
  }

  private scrollLoop_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.scrollLoop_());
      const measureValue = this.getMeasureValue_();
      renderLoop.scrollMutate(() => this.mutate_(measureValue));
    });
  }

  private renderLoop_() {
    if (this.destroyed_) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.renderLoop_());
      const measureValue = this.getMeasureValue_();
      renderLoop.mutate(() => this.mutate_(measureValue));
    });
  }

  private getMeasureValue_(): MeasureValue {
    const yPosition: number = getVisibleYPosition(this.container_);
    const maxDistance: number =
      this.container_.offsetHeight -
      this.clone_.offsetHeight -
      this.clone_.offsetTop;
    const shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
    const position = Sticky2.getPosition_(shouldPin, yPosition);

    const commonFrame =
      getCommonPositionedParentElement(this.clone_, this.target_);
    const cloneDistanceFromFrame =
      getVisibleDistanceBetweenElements(this.clone_, commonFrame);
    const cloneDistanceFromRoot = getVisibleDistanceFromRoot(this.clone_);
    const cloneStyle = window.getComputedStyle(this.clone_);

    return new MeasureValue(
      position,
      cloneStyle,
      cloneDistanceFromFrame,
      cloneDistanceFromRoot,
      maxDistance);
  }

  private mutate_(measureValue: MeasureValue): void {
    this.applyCloneStylesToTarget_(measureValue.cloneStyle);

    // Skip duplicating work
    if (this.lastPosition_ === measureValue.position) {
      return;
    }

    // Determine if the target should stick
    if (measureValue.position === ContainerPosition.TOP) {
      this.target_.style.position = 'absolute';
      measureValue.cloneDistanceFromFrame
        .positionElementByTranslation(this.target_);
    }
    else if (measureValue.position === ContainerPosition.MIDDLE) {
      this.target_.style.position = 'fixed';
      new Vector2d(
        measureValue.cloneDistanceFromRoot.x,
        measureValue.cloneDistanceFromFrame.y
      )
        .positionElementByTranslation(this.target_);
    }
    else if (measureValue.position === ContainerPosition.BOTTOM) {
      this.target_.style.position = 'absolute';
      measureValue.cloneDistanceFromFrame
        .add(new Vector2d(0, measureValue.maxDistance))
        .positionElementByTranslation(this.target_);
    }

    this.lastPosition_ = measureValue.position;
  }

  private applyCloneStylesToTarget_(cloneStyles: CSSStyleDeclaration): void {
    this.target_.style.margin = '0';
    this.target_.style.top = '0';
    this.target_.style.bottom = '0';
    this.target_.style.left = '0';
    this.target_.style.right = '0';
    this.target_.style.padding = cloneStyles.padding;
    this.target_.style.width = cloneStyles.width;
    this.target_.style.height = cloneStyles.height;
    this.target_.style.border = cloneStyles.border;
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {Sticky2};
