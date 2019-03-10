import {Matrix} from './matrix';
import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {ZERO_VECTOR_2D} from "../../math/geometry/zero-vector-2d";

const translations =
  DynamicDefaultMap.usingFunction((el: HTMLElement) => ZERO_VECTOR_2D);
const translatedElements = new Set();
const matrices = new Map();

function translate2d(element: HTMLElement, vector: Vector2d): void {
  const sourceMatrix: Matrix = Matrix.fromElementTransform(element);
  matrices.set(element, sourceMatrix);
  translations.set(element, translations.get(element).add(vector));

  renderLoop.anyMutate(() => {
    if (!translatedElements.has(element)) {
      matrices.get(element) // Ensure latest matrix
        .translate(translations.get(element))
        .applyToElementTransform(element);
    }
    translatedElements.add(element);

    // Cleanup translations
    renderLoop.anyCleanup(() => {
      matrices.delete(element);
      translations.delete(element);
      translatedElements.delete(element);
    });
  });
}

export {translate2d};
