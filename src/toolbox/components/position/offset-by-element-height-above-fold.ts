import {renderLoop} from "../../utils/render-loop";
import {getVisibleHeight} from "../../utils/dom/position/vertical/get-visible-height";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {set2dTranslation} from "../../utils/dom/position/set-2d-translation";
/**
 * Used to push fixed position elements up and out of the way as a footer comes
 * up. May have other uses, but that's what I set this up for initially.
 */
class OffsetByElementHeightAboveFold {
  private targetElement_: HTMLElement;
  private offsetElement_: HTMLElement;

  constructor(targetElement: HTMLElement, offsetElement: HTMLElement) {
    this.targetElement_ = targetElement;
    this.offsetElement_ = offsetElement;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const visibleHeight = getVisibleHeight(this.offsetElement_);
      renderLoop.measure(() => {
        set2dTranslation(this.targetElement_, new Vector2d(0, -visibleHeight));
      });
    });
  }
}

export {OffsetByElementHeightAboveFold};
