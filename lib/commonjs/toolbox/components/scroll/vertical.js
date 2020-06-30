"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalScroll = void 0;
var draggable_1 = require("../draggable/draggable");
var fixed_x_1 = require("../draggable/constraints/fixed-x");
var container_1 = require("../draggable/constraints/container");
var VerticalScroll = (function () {
    function VerticalScroll(element, container) {
        new draggable_1.Draggable(element, {
            constraints: [
                new container_1.ContainerConstraint(container), new fixed_x_1.DraggableFixedXConstraint()
            ]
        });
    }
    return VerticalScroll;
}());
exports.VerticalScroll = VerticalScroll;
//# sourceMappingURL=vertical.js.map