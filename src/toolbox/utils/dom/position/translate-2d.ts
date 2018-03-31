import {Matrix} from './matrix';
import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";

function translate2d(element: HTMLElement, vector: Vector2d): void {
  renderLoop.measure(() => {
    const targetMatrix = Matrix.fromElementTransform(element).translate(vector);
    renderLoop.mutate(() => targetMatrix.applyToElementTransform(element));
  });
}

export {translate2d};
