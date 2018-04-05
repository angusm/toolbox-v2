import { Matrix } from './matrix';
import { renderLoop } from '../../render-loop';
function set2dTranslation(element, vector) {
    renderLoop.measure(function () {
        renderLoop.mutate(function () { return new Matrix().translate(vector).applyToElementTransform(element); });
    });
}
export { set2dTranslation };
//# sourceMappingURL=set-2d-translation.js.map