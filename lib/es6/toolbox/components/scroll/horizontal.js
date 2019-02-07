import { Draggable } from '../draggable/base';
import { FixedYConstraint } from '../draggable/constraints/fixed-y';
import { ContainerConstraint } from '../draggable/constraints/container';
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new Draggable(element, {
            constraints: [
                new ContainerConstraint(container), new FixedYConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
export { HorizontalScroll };
//# sourceMappingURL=horizontal.js.map