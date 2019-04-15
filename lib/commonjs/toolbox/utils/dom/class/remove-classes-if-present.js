"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function removeClassesIfPresent(element, classesToRemove) {
    render_loop_1.renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, classesToRemove);
    });
}
exports.removeClassesIfPresent = removeClassesIfPresent;
//# sourceMappingURL=remove-classes-if-present.js.map