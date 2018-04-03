"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_agent_1 = require("../../utils/user-agent/user-agent");
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var CLASS_NAME = 'os-marker';
var OSMarker = (function () {
    function OSMarker() {
        this.init_();
    }
    OSMarker.prototype.init_ = function () {
        render_loop_1.renderLoop.measure(function () {
            var html = document.querySelector('html');
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, [user_agent_1.UserAgent.getOS().getAsCSSModifier()]); });
        });
    };
    return OSMarker;
}());
exports.OSMarker = OSMarker;
//# sourceMappingURL=base.js.map