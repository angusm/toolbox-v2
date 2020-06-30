"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayOnWideAspectRatio = void 0;
var has_wide_aspect_ratio_1 = require("../../utils/dom/position/aspect-ratio/has-wide-aspect-ratio");
var base_1 = require("../run-on-condition/base");
var clear_style_1 = require("../../utils/dom/style/clear-style");
var set_style_1 = require("../../utils/dom/style/set-style");
var has_square_aspect_ratio_1 = require("../../utils/dom/position/aspect-ratio/has-square-aspect-ratio");
var DisplayOnWideAspectRatio = (function () {
    function DisplayOnWideAspectRatio(element, includeSquare) {
        var _this = this;
        this.element_ = element;
        this.includeSquare_ = includeSquare;
        this.runOnCondition_ =
            new base_1.RunOnCondition(function () { return _this.displayElement_(); }, function () { return _this.isWide_(); }, function () { return _this.hideElement_(); });
    }
    DisplayOnWideAspectRatio.prototype.displayElement_ = function () {
        clear_style_1.clearStyle(this.element_, 'display');
    };
    DisplayOnWideAspectRatio.prototype.hideElement_ = function () {
        set_style_1.setStyle(this.element_, 'display', 'none');
    };
    DisplayOnWideAspectRatio.prototype.isWide_ = function () {
        return has_wide_aspect_ratio_1.hasWideAspectRatio(this.element_) ||
            (this.includeSquare_ && has_square_aspect_ratio_1.hasSquareAspectRatio(this.element_));
    };
    DisplayOnWideAspectRatio.prototype.destroy = function () {
        this.runOnCondition_.destroy();
    };
    return DisplayOnWideAspectRatio;
}());
exports.DisplayOnWideAspectRatio = DisplayOnWideAspectRatio;
//# sourceMappingURL=wide.js.map