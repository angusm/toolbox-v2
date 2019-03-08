"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
function addClassesFromSet(element, cssClasses) {
    render_loop_1.renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).add.apply(_a, Array.from(cssClasses));
    });
}
exports.addClassesFromSet = addClassesFromSet;
//# sourceMappingURL=add-classes-from-set.js.map