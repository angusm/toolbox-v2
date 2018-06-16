"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var range_1 = require("../../utils/math/range");
var color_1 = require("../../utils/color/color");
var set_style_1 = require("../../utils/dom/style/set-style");
var get_visible_center_y_position_1 = require("../../utils/dom/position/vertical/get-visible-center-y-position");
var get_visible_y_range_1 = require("../../utils/dom/position/vertical/get-visible-y-range");
var array_1 = require("../../utils/map/array");
var VerticalBatchHighContrastProperty = (function () {
    function VerticalBatchHighContrastProperty(targets, backgrounds, getColorOptionsFn, _a) {
        var _b = _a === void 0 ? {
            limit: false,
            colorMap: new Map(),
        } : _a, _c = _b.limit, limit = _c === void 0 ? false : _c, _d = _b.colorMap, colorMap = _d === void 0 ? new Map() : _d;
        this.targets_ = targets;
        this.backgrounds_ = backgrounds;
        this.getColorOptionsFn_ = getColorOptionsFn;
        this.limit_ = limit;
        this.colorMap_ = colorMap;
        this.render();
    }
    VerticalBatchHighContrastProperty.prototype.render = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            if (!_this.limit_) {
                render_loop_1.renderLoop.cleanup(function () { return _this.render(); });
            }
            var ranges = _this.getBackgroundHeightRanges_();
            var yPositions = _this.getTargetYPositions_();
            Array.from(yPositions.entries()).forEach(function (_a) {
                var yPosition = _a[0], targets = _a[1];
                targets.forEach(function (target) {
                    Array.from(ranges.entries()).some(function (_a) {
                        var range = _a[0], backgroundElement = _a[1];
                        if (range.contains(yPosition)) {
                            _this.updateTarget_(target, backgroundElement);
                            return true;
                        }
                    });
                });
            });
        });
    };
    VerticalBatchHighContrastProperty.prototype.updateTarget_ = function (target, backgroundElement) {
        var colorToSet = this.getColorToSet_(backgroundElement);
        render_loop_1.renderLoop.mutate(function () {
            target.properties.forEach(function (property) {
                set_style_1.setStyle(target.element, property, colorToSet.toStyleString());
            });
        });
    };
    VerticalBatchHighContrastProperty.prototype.getColorToSet_ = function (bgElement) {
        var _this = this;
        var behindBgColor = color_1.Color.fromElementBackgroundColor(bgElement);
        var colorOptions = this.getColorOptionsFn_();
        if (this.colorMap_.has(behindBgColor) &&
            colorOptions.some(function (c) { return c === _this.colorMap_.get(behindBgColor); })) {
            return this.colorMap_.get(behindBgColor);
        }
        else {
            return behindBgColor.getColorWithHighestContrast.apply(behindBgColor, colorOptions);
        }
    };
    VerticalBatchHighContrastProperty.prototype.getBackgroundHeightRanges_ = function () {
        var windowRange = new range_1.Range(0, window.innerHeight);
        return this.backgrounds_
            .reduce(function (mapping, background) {
            var visibleRange = get_visible_y_range_1.getVisibleYRange(background);
            if (visibleRange.getOverlap(windowRange) !== null) {
                mapping.set(visibleRange, background);
            }
            return mapping;
        }, new Map());
    };
    VerticalBatchHighContrastProperty.prototype.getTargetYPositions_ = function () {
        var windowRange = new range_1.Range(0, window.innerHeight);
        return this.targets_
            .reduce(function (mapping, target) {
            var centerY = get_visible_center_y_position_1.getVisibleCenterYPosition(target.element);
            if (windowRange.contains(centerY)) {
                mapping.get(centerY).push(target);
            }
            return mapping;
        }, new array_1.ArrayMap());
    };
    return VerticalBatchHighContrastProperty;
}());
exports.VerticalBatchHighContrastProperty = VerticalBatchHighContrastProperty;
//# sourceMappingURL=vertical-batch.js.map