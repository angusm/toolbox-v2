import { Matrix } from './matrix';
import { renderLoop } from '../../render-loop';
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
var translations = DynamicDefaultMap.usingFunction(function (el) { return ZERO_VECTOR_2D; });
var translatedElements = new Set();
var matrices = new Map();
function translate2d(element, vector) {
    var sourceMatrix = Matrix.fromElementTransform(element);
    matrices.set(element, sourceMatrix);
    translations.set(element, translations.get(element).add(vector));
    renderLoop.anyMutate(function () {
        if (!translatedElements.has(element)) {
            matrices.get(element)
                .translate(translations.get(element))
                .applyToElementTransform(element);
        }
        translatedElements.add(element);
        renderLoop.anyCleanup(function () {
            matrices.delete(element);
            translations.delete(element);
            translatedElements.delete(element);
        });
    });
}
export { translate2d };
//# sourceMappingURL=translate-2d.js.map