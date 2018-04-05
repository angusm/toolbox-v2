import {Matrix} from './matrix';
import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";

function set2dTranslation(element: HTMLElement, vector: Vector2d): void {
  renderLoop.measure(() => {
    renderLoop.mutate(
      () => new Matrix().translate(vector).applyToElementTransform(element));
  });
}

export {set2dTranslation};
