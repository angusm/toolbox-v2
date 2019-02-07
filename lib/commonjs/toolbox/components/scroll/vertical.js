"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../draggable/base");
var fixed_x_1 = require("../draggable/constraints/fixed-x");
var container_1 = require("../draggable/constraints/container");
var HorizontalScroll = (function () {
    function HorizontalScroll(element, container) {
        new base_1.Draggable(element, {
            constraints: [
                new container_1.ContainerConstraint(container), new fixed_x_1.FixedXConstraint()
            ]
        });
    }
    return HorizontalScroll;
}());
exports.HorizontalScroll = HorizontalScroll;
//# sourceMappingURL=vertical.js.map