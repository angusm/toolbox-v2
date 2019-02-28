import { Matrix } from './matrix';
import { renderLoop } from '../../render-loop';
function translate2dOnScrollLoop(element, vector) {
    renderLoop.scrollMeasure(function () {
        var targetMatrix = Matrix.fromElementTransform(element).translate(vector);
        renderLoop
            .scrollMutate(function () { return targetMatrix.applyToElementTransform(element); });
    });
}
export { translate2dOnScrollLoop };
//# sourceMappingURL=translate-2d-on-scroll-loop.js.map