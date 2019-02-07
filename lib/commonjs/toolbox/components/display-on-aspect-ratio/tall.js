"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var has_tall_aspect_ratio_1 = require("../../utils/dom/position/aspect-ratio/has-tall-aspect-ratio");
var base_1 = require("../run-on-condition/base");
var clear_style_1 = require("../../utils/dom/style/clear-style");
var set_style_1 = require("../../utils/dom/style/set-style");
var has_square_aspect_ratio_1 = require("../../utils/dom/position/aspect-ratio/has-square-aspect-ratio");
var DisplayOnTallAspectRatio = (function () {
    function DisplayOnTallAspectRatio(element, includeSquare) {
        var _this = this;
        this.element_ = element;
        this.includeSquare_ = includeSquare;
        this.runOnCondition_ =
            new base_1.RunOnCondition(function () { return _this.displayElement_(); }, function () { return _this.isTall_(); }, function () { return _this.hideElement_(); });
    }
    DisplayOnTallAspectRatio.prototype.displayElement_ = function () {
        clear_style_1.clearStyle(this.element_, 'display');
    };
    DisplayOnTallAspectRatio.prototype.hideElement_ = function () {
        set_style_1.setStyle(this.element_, 'display', 'none');
    };
    DisplayOnTallAspectRatio.prototype.isTall_ = function () {
        return has_tall_aspect_ratio_1.hasTallAspectRatio(this.element_) ||
            (this.includeSquare_ && has_square_aspect_ratio_1.hasSquareAspectRatio(this.element_));
    };
    DisplayOnTallAspectRatio.prototype.destroy = function () {
        this.runOnCondition_.destroy();
    };
    return DisplayOnTallAspectRatio;
}());
exports.DisplayOnTallAspectRatio = DisplayOnTallAspectRatio;
//# sourceMappingURL=tall.js.map