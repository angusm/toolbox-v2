import { hasTallAspectRatio } from "../../utils/dom/position/aspect-ratio/has-tall-aspect-ratio";
import { RunOnCondition } from "../run-on-condition/base";
import { clearStyle } from "../../utils/dom/style/clear-style";
import { setStyle } from "../../utils/dom/style/set-style";
import { hasSquareAspectRatio } from "../../utils/dom/position/aspect-ratio/has-square-aspect-ratio";
var DisplayOnTallAspectRatio = (function () {
    function DisplayOnTallAspectRatio(element, includeSquare) {
        var _this = this;
        this.element_ = element;
        this.includeSquare_ = includeSquare;
        this.runOnCondition_ =
            new RunOnCondition(function () { return _this.displayElement_(); }, function () { return _this.isTall_(); }, function () { return _this.hideElement_(); });
    }
    DisplayOnTallAspectRatio.prototype.displayElement_ = function () {
        clearStyle(this.element_, 'display');
    };
    DisplayOnTallAspectRatio.prototype.hideElement_ = function () {
        setStyle(this.element_, 'display', 'none');
    };
    DisplayOnTallAspectRatio.prototype.isTall_ = function () {
        return hasTallAspectRatio(this.element_) ||
            (this.includeSquare_ && hasSquareAspectRatio(this.element_));
    };
    DisplayOnTallAspectRatio.prototype.destroy = function () {
        this.runOnCondition_.destroy();
    };
    return DisplayOnTallAspectRatio;
}());
export { DisplayOnTallAspectRatio };
//# sourceMappingURL=tall.js.map