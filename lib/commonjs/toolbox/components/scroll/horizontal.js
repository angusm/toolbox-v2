"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalScroll = void 0;
var draggable_1 = require("../draggable/draggable");
var fixed_y_1 = require("../draggable/constraints/fixed-y");
var container_1 = require("../draggable/constraints/container");
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new draggable_1.Draggable(element, {
            constraints: [
                new container_1.ContainerConstraint(container), new fixed_y_1.DraggableFixedYConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
exports.HorizontalScroll = HorizontalScroll;
//# sourceMappingURL=horizontal.js.map