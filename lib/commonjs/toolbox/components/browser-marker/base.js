"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserMarker = void 0;
var user_agent_1 = require("../../utils/user-agent/user-agent");
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var CLASS_NAME = 'tb-browser-marker';
var BrowserMarker = (function () {
    function BrowserMarker() {
        this.init_();
    }
    BrowserMarker.prototype.init_ = function () {
        render_loop_1.renderLoop.measure(function () {
            var html = document.querySelector('html');
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, [user_agent_1.UserAgent.getBrowser().getAsCSSModifier()]); });
        });
    };
    return BrowserMarker;
}());
exports.BrowserMarker = BrowserMarker;
//# sourceMappingURL=base.js.map