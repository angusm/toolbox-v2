import {Matrix} from './matrix';
import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";

function translate2dOnScrollLoop(element: HTMLElement, vector: Vector2d): void {
  renderLoop.scrollMeasure(() => {
    const targetMatrix = Matrix.fromElementTransform(element).translate(vector);
    renderLoop.anyMutate(() => targetMatrix.applyToElementTransform(element));
  });
}

export {translate2dOnScrollLoop};
