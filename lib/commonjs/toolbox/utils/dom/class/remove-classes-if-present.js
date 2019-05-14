"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function removeClassesIfPresent(element, classesToRemove) {
    render_loop_1.renderLoop.mutate(function () {
        classesToRemove.forEach(function (classToRemove) { return element.classList.remove(classToRemove); });
    });
}
exports.removeClassesIfPresent = removeClassesIfPresent;
//# sourceMappingURL=remove-classes-if-present.js.map