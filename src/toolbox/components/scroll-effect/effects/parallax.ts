import {Matrix} from "../../../utils/dom/position/matrix";
import {renderLoop} from "../../../utils/render-loop";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {IEffect} from "./ieffect";

class Parallax implements IEffect {
  private ratio_: number;

  constructor(ratio: number) {
    this.ratio_ = ratio;
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const offset = distance * this.ratio_;
    const originalMatrix = Matrix.fromElementTransform(target);
    const translation =
      originalMatrix.set2dTranslation(new Vector2d(0, offset));

    renderLoop.scrollMutate(() => translation.applyToElementTransform(target));
  }

  destroy() {}
}

export {Parallax}
