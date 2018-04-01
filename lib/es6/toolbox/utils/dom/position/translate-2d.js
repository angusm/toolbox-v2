import { Matrix } from './matrix';
import { renderLoop } from '../../render-loop';
function translate2d(element, vector) {
    renderLoop.measure(function () {
        var targetMatrix = Matrix.fromElementTransform(element).translate(vector);
        renderLoop.mutate(function () { return targetMatrix.applyToElementTransform(element); });
    });
}
export { translate2d };
//# sourceMappingURL=translate-2d.js.map