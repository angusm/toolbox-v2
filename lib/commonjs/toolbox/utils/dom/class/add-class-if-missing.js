"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function addClassIfMissing(element, classToAdd) {
    render_loop_1.renderLoop.anyMutate(function () { return element.classList.add(classToAdd); });
}
exports.addClassIfMissing = addClassIfMissing;
//# sourceMappingURL=add-class-if-missing.js.map