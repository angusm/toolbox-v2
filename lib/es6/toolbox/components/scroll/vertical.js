import { Draggable } from '../draggable/draggable';
import { DraggableFixedXConstraint } from "../draggable/constraints/fixed-x";
import { ContainerConstraint } from "../draggable/constraints/container";
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new Draggable(element, {
            constraints: [
                new ContainerConstraint(container), new DraggableFixedXConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
export { HorizontalScroll };
//# sourceMappingURL=vertical.js.map