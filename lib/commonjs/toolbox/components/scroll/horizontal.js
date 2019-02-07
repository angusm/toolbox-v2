"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../draggable/base");
var fixed_y_1 = require("../draggable/constraints/fixed-y");
var container_1 = require("../draggable/constraints/container");
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new base_1.Draggable(element, {
            constraints: [
                new container_1.ContainerConstraint(container), new fixed_y_1.DraggableFixedYConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
exports.HorizontalScroll = HorizontalScroll;
//# sourceMappingURL=horizontal.js.map