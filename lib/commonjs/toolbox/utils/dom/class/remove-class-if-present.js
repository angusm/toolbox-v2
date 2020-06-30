"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClassIfPresent = void 0;
var render_loop_1 = require("../../render-loop");
function removeClassIfPresent(element) {
    var classesToRemove = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classesToRemove[_i - 1] = arguments[_i];
    }
    render_loop_1.renderLoop.anyMutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, classesToRemove);
    });
}
exports.removeClassIfPresent = removeClassIfPresent;
//# sourceMappingURL=remove-class-if-present.js.map