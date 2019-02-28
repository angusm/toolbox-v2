import { Draggable } from '../draggable/draggable';
import { DraggableFixedXConstraint } from "../draggable/constraints/fixed-x";
import { ContainerConstraint } from "../draggable/constraints/container";
var VerticalScroll = (function () {
    function VerticalScroll(element, container) {
        new Draggable(element, {
            constraints: [
                new ContainerConstraint(container), new DraggableFixedXConstraint()
            ]
        });
    }
    return VerticalScroll;
}());
export { VerticalScroll };
//# sourceMappingURL=vertical.js.map