"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function addClassIfMissing(element, classToAdd) {
    render_loop_1.renderLoop.measure(function () {
        if (!element.classList.contains(classToAdd)) {
            render_loop_1.renderLoop.mutate(function () { return element.classList.add(classToAdd); });
        }
    });
}
exports.addClassIfMissing = addClassIfMissing;
//# sourceMappingURL=add-class-if-missing.js.map