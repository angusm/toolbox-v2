"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoToggleClass = void 0;
var render_loop_1 = require("../../render-loop");
function autoToggleClass(element, cssClass, rawToggle) {
    if (rawToggle === void 0) { rawToggle = null; }
    var toggle = rawToggle === null ? !element.classList.contains(cssClass) : rawToggle;
    if (toggle) {
        render_loop_1.renderLoop.anyMutate(function () { return element.classList.add(cssClass); });
    }
    else {
        render_loop_1.renderLoop.anyMutate(function () { return element.classList.remove(cssClass); });
    }
}
exports.autoToggleClass = autoToggleClass;
//# sourceMappingURL=auto-toggle-class.js.map