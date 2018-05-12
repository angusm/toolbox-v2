import { renderLoop } from "../../utils/render-loop";
import { Range } from "../../utils/math/range";
import { Color } from "../../utils/color/color";
import { setStyle } from "../../utils/dom/style/set-style";
import { getVisibleCenterYPosition } from "../../utils/dom/position/vertical/get-visible-center-y-position";
import { getVisibleYRange } from "../../utils/dom/position/vertical/get-visible-y-range";
var VerticalBatchHighContrastProperty = (function () {
    function VerticalBatchHighContrastProperty(targets, backgrounds, colorOptions, _a) {
        var _b = _a === void 0 ? {
            limit: false,
            colorMap: new Map(),
        } : _a, _c = _b.limit, limit = _c === void 0 ? false : _c, _d = _b.colorMap, colorMap = _d === void 0 ? new Map() : _d;
        this.targets_ = targets;
        this.backgrounds_ = backgrounds;
        this.colorOptions_ = colorOptions;
        this.limit_ = limit;
        this.colorMap_ = colorMap;
        this.render();
    }
    VerticalBatchHighContrastProperty.prototype.render = function () {
        var _this = this;
        renderLoop.measure(function () {
            if (!_this.limit_) {
                renderLoop.cleanup(function () { return _this.render(); });
            }
            var ranges = _this.getBackgroundHeightRanges_();
            var yPositions = _this.getTargetYPositions_();
            Array.from(ranges.entries()).forEach(function (_a) {
                var range = _a[0], backgroundElement = _a[1];
                Array.from(yPositions.entries()).forEach(function (_a) {
                    var yPosition = _a[0], target = _a[1];
                    if (range.contains(yPosition)) {
                        _this.updateTarget_(target, backgroundElement);
                    }
                });
            });
        });
    };
    VerticalBatchHighContrastProperty.prototype.updateTarget_ = function (target, backgroundElement) {
        var colorToSet = this.getColorToSet_(backgroundElement);
        renderLoop.mutate(function () {
            target.properties.forEach(function (property) {
                setStyle(target.element, property, colorToSet.toStyleString());
            });
        });
    };
    VerticalBatchHighContrastProperty.prototype.getColorToSet_ = function (bgElement) {
        var behindBgColor = Color.fromElementBackgroundColor(bgElement);
        if (this.colorMap_.has(behindBgColor)) {
            return this.colorMap_.get(behindBgColor);
        }
        else {
            return behindBgColor.getColorWithHighestContrast.apply(behindBgColor, this.colorOptions_);
        }
    };
    VerticalBatchHighContrastProperty.prototype.getBackgroundHeightRanges_ = function () {
        var windowRange = new Range(0, window.innerHeight);
        return this.backgrounds_
            .reduce(function (mapping, background) {
            var visibleRange = getVisibleYRange(background);
            if (visibleRange.getOverlap(windowRange) !== null) {
                mapping.set(visibleRange, background);
            }
            return mapping;
        }, new Map());
    };
    VerticalBatchHighContrastProperty.prototype.getTargetYPositions_ = function () {
        var windowRange = new Range(0, window.innerHeight);
        return this.targets_
            .reduce(function (mapping, target) {
            var centerY = getVisibleCenterYPosition(target.element);
            if (windowRange.contains(centerY)) {
                mapping.set(centerY, target);
            }
            return mapping;
        }, new Map());
    };
    return VerticalBatchHighContrastProperty;
}());
export { VerticalBatchHighContrastProperty };
//# sourceMappingURL=vertical-batch.js.map