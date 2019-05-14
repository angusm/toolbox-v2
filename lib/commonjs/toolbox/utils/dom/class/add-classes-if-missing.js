"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function addClassesIfMissing(element, classesToAdd) {
    render_loop_1.renderLoop.mutate(function () {
        classesToAdd.forEach(function (classToAdd) { return element.classList.add(classToAdd); });
    });
}
exports.addClassesIfMissing = addClassesIfMissing;
//# sourceMappingURL=add-classes-if-missing.js.map