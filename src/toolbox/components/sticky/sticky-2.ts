import {NumericRange} from "../../utils/math/numeric-range";
import {getVisibleYPosition} from "../../utils/dom/position/vertical/get-visible-y-position";
import {renderLoop} from "../../utils/render-loop";
import {getOffsetFromAncestor} from "../../utils/dom/position/get-offset-from-ancestor";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {Dimensions2d} from "../../utils/math/geometry/dimensions-2d";
import {getVisibleDistanceBetweenElements} from "../../utils/dom/position/get-visible-distance-between-elements";
import {getVisibleDistanceFromRoot} from "../../utils/dom/position/get-visible-distance-from-root";
import {getCommonOffsetAncestor} from "../../utils/dom/position/get-common-offset-ancestor";
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
 * Simulates `position: sticky` when native support isn't available due to
 * `overflow: hidden` on parent elements.
 */
class Sticky2 {
  private readonly container_: HTMLElement;
  private readonly target_: HTMLElement;
  private readonly clone_: HTMLElement;
  private destroyed_: boolean;
  private lastPosition_: Symbol;

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

    this.measure_();
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

  private static getPosition_(shouldPin: boolean, yPosition: number): Symbol {
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


    // Skip duplicating work
    if (this.lastPosition_ === position) {
      return;
    }

    renderLoop.scrollMutate(() => {
      this.applyCloneStylesToTarget_(cloneStyle);

      // Determine if the target should stick
      if (position === ContainerPosition.TOP) {
        this.target_.style.position = 'absolute';
        cloneDistanceFromFrame.positionElementByTranslation(this.target_);
      }
      else if (position === ContainerPosition.MIDDLE) {
        this.target_.style.position = 'fixed';
        new Vector2d(cloneDistanceFromRoot.x, cloneDistanceFromFrame.y)
          .positionElementByTranslation(this.target_);
      }
      else if (position === ContainerPosition.BOTTOM) {
        this.target_.style.position = 'absolute';
        cloneDistanceFromFrame
          .add(new Vector2d(0, maxDistance))
          .positionElementByTranslation(this.target_);
      }

      this.lastPosition_ = position;
    });
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
