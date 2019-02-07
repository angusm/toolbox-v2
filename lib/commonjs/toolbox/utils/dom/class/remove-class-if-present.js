"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function removeClassIfPresent(element, classToRemove) {
    render_loop_1.renderLoop.measure(function () {
        if (element.classList.contains(classToRemove)) {
            render_loop_1.renderLoop.mutate(function () { return element.classList.remove(classToRemove); });
        }
    });
}
exports.removeClassIfPresent = removeClassIfPresent;
//# sourceMappingURL=remove-class-if-present.js.map