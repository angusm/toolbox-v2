import { Draggable } from '../draggable/base';
import { FixedXConstraint } from '../draggable/constraints/fixed-x';
import { ContainerConstraint } from '../draggable/constraints/container';
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new Draggable(element, {
            constraints: [
                new ContainerConstraint(container), new FixedXConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
export { HorizontalScroll };
//# sourceMappingURL=vertical.js.map