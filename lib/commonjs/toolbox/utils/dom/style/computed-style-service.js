"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputedStyleService = void 0;
var dynamic_default_1 = require("../../map/dynamic-default");
var render_loop_1 = require("../../render-loop");
var ComputedStyleService = (function () {
    function ComputedStyleService() {
        this.computedStyle_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return window.getComputedStyle(element); });
        this.init_();
    }
    ComputedStyleService.prototype.init_ = function () {
        this.renderLoop_();
    };
    ComputedStyleService.prototype.getComputedStyle = function (element) {
        return this.computedStyle_.get(element);
    };
    ComputedStyleService.prototype.renderLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.anyMutate(function () {
            render_loop_1.renderLoop.anyCleanup(function () {
                _this.computedStyle_.clear();
                _this.renderLoop_();
            });
        });
    };
    ComputedStyleService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    ComputedStyleService.singleton_ = null;
    return ComputedStyleService;
}());
exports.ComputedStyleService = ComputedStyleService;
//# sourceMappingURL=computed-style-service.js.map