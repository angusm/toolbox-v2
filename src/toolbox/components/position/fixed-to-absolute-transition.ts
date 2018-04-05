import {renderLoop} from "../../utils/render-loop";
import {setStyle} from "../../utils/dom/style/set-style";
import {FixedPosition} from "../../utils/dom/style/fixed-position";
import {AbsolutePosition} from "../../utils/dom/style/absolute-position";

const initialPosition = new FixedPosition('', '', '', '');

/**
 * Used to push fixed position elements up and out of the way as a footer comes
 * up. May have other uses, but that's what I set this up for initially.
 */
class FixedToAbsoluteTransition {
  private conditionFn_: () => boolean; // True when should be absolute
  private getAbsolutePositionFn_: () => AbsolutePosition;
  private targetElement_: HTMLElement;

  constructor(
    conditionFn: () => boolean,
    getAbsolutePositionFn: () => AbsolutePosition,
    targetElement: HTMLElement
  ) {
    this.conditionFn_ = conditionFn;
    this.getAbsolutePositionFn_ = getAbsolutePositionFn;
    this.targetElement_ = targetElement;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      if (this.conditionFn_()) {
        this.absolutePosition_();
      } else {
        this.fixPosition_();
      }
    });
  }

  private absolutePosition_(): void {
    const position = this.getAbsolutePositionFn_();
    renderLoop.mutate(() => {
      setStyle(this.targetElement_, 'position', 'absolute');
      position.positionElement(this.targetElement_);
    });
  }

  private fixPosition_(): void {
    renderLoop.mutate(() => {
      setStyle(this.targetElement_, 'position', 'fixed');
      initialPosition.positionElement(this.targetElement_);
    });
  }
}

export {FixedToAbsoluteTransition};