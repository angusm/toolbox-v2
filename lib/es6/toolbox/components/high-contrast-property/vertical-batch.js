import { renderLoop } from "../../utils/render-loop";
import { Range } from "../../utils/math/range";
import { Color } from "../../utils/color/color";
import { setStyle } from "../../utils/dom/style/set-style";
import { getVisibleCenterYPosition } from "../../utils/dom/position/vertical/get-visible-center-y-position";
import { getVisibleYRange } from "../../utils/dom/position/vertical/get-visible-y-range";
import { ArrayMap } from "../../utils/map";
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
        renderLoop.measure(function () {
            if (!_this.limit_) {
                renderLoop.cleanup(function () { return _this.render(); });
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
            return behindBgColor
                .getColorWithHighestContrast.apply(behindBgColor, this.getColorOptionsFn_());
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
                mapping.get(centerY).push(target);
            }
            return mapping;
        }, new ArrayMap());
    };
    return VerticalBatchHighContrastProperty;
}());
export { VerticalBatchHighContrastProperty };
//# sourceMappingURL=vertical-batch.js.map