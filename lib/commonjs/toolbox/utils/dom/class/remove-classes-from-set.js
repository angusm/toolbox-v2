"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClassesFromSet = void 0;
var render_loop_1 = require("../../render-loop");
function removeClassesFromSet(element, cssClasses) {
    render_loop_1.renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, Array.from(cssClasses));
    });
}
exports.removeClassesFromSet = removeClassesFromSet;
//# sourceMappingURL=remove-classes-from-set.js.map