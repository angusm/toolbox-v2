import {renderLoop} from "../../utils/render-loop";
import {getVisibleHeight} from "../../utils/dom/position/get-visible-height";
import {translate2d} from "../../utils/dom/position/translate-2d";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
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
        translate2d(this.targetElement_, new Vector2d(0, -visibleHeight));
      });
    });
  }
}

export {OffsetByElementHeightAboveFold};