"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../../utils/color/color");
var render_loop_1 = require("../../utils/render-loop");
var get_element_behind_1 = require("../../utils/dom/position/get-element-behind");
var set_style_1 = require("../../utils/dom/style/set-style");
var multi_value_dynamic_default_1 = require("../../utils/map/multi-value-dynamic-default");
var colorContrastResults = multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(function (_a) {
    var color = _a[0], colorOptions = _a[1];
    return color.getColorWithHighestContrast.apply(color, colorOptions);
});
var HighContrastProperty = (function () {
    function HighContrastProperty(getTargetsFn, getCandidateBgElements, getColorOptionsFn, _a) {
        var _b = _a === void 0 ? {
            getColorMapFn: function () { return new Map(); },
            getHighContrastColorFn: null,
            limit: null,
        } : _a, _c = _b.getColorMapFn, getColorMapFn = _c === void 0 ? function () { return new Map(); } : _c, _d = _b.getHighContrastColorFn, getHighContrastColorFn = _d === void 0 ? null : _d, _e = _b.limit, limit = _e === void 0 ? null : _e;
        this.destroyed_ = false;
        this.getTargetsFn_ = getTargetsFn;
        this.getCandidateBgElements_ = getCandidateBgElements;
        this.getColorOptionsFn_ = getColorOptionsFn;
        this.getColorMapFn_ = getColorMapFn;
        this.getHighContrastColorFn_ = getHighContrastColorFn;
        this.limit_ = limit;
        this.init_();
    }
    HighContrastProperty.getProperty = function () {
        return '';
    };
    HighContrastProperty.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.cleanup(function () { return _this.render(); });
    };
    HighContrastProperty.prototype.render = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            if (!_this.limit_) {
                render_loop_1.renderLoop.cleanup(function () { return _this.render(); });
            }
            var bgElements = _this.getCandidateBgElements_();
            _this.getTargetsFn_().forEach(function (target) {
                var bgElement = get_element_behind_1.getElementBehind(target, bgElements);
                var textColorToSet = _this.getTextColorToSet_(target, bgElement);
                render_loop_1.renderLoop.mutate(function () { return set_style_1.setStyle(target, _this.constructor.getProperty(), textColorToSet.toStyleString()); });
            });
        });
    };
    HighContrastProperty.prototype.getTextColorToSet_ = function (target, bgElement) {
        var behindBgColor = color_1.Color.fromElementBackgroundColor(bgElement);
        if (this.getHighContrastColorFn_) {
            return this.getHighContrastColorFn_(target, bgElement);
        }
        else if (this.getColorMapFn_().has(behindBgColor)) {
            return this.getColorMapFn_().get(behindBgColor);
        }
        else {
            return colorContrastResults
                .get([behindBgColor, this.getColorOptionsFn_()]);
        }
    };
    HighContrastProperty.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return HighContrastProperty;
}());
exports.HighContrastProperty = HighContrastProperty;
//# sourceMappingURL=base.js.map