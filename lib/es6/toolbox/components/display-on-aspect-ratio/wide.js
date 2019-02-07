import { hasWideAspectRatio } from "../../utils/dom/position/aspect-ratio/has-wide-aspect-ratio";
import { RunOnCondition } from "../run-on-condition/base";
import { clearStyle } from "../../utils/dom/style/clear-style";
import { setStyle } from "../../utils/dom/style/set-style";
import { hasSquareAspectRatio } from "../../utils/dom/position/aspect-ratio/has-square-aspect-ratio";
var DisplayOnWideAspectRatio = (function () {
    function DisplayOnWideAspectRatio(element, includeSquare) {
        var _this = this;
        this.element_ = element;
        this.includeSquare_ = includeSquare;
        this.runOnCondition_ =
            new RunOnCondition(function () { return _this.displayElement_(); }, function () { return _this.isWide_(); }, function () { return _this.hideElement_(); });
    }
    DisplayOnWideAspectRatio.prototype.displayElement_ = function () {
        clearStyle(this.element_, 'display');
    };
    DisplayOnWideAspectRatio.prototype.hideElement_ = function () {
        setStyle(this.element_, 'display', 'none');
    };
    DisplayOnWideAspectRatio.prototype.isWide_ = function () {
        return hasWideAspectRatio(this.element_) ||
            (this.includeSquare_ && hasSquareAspectRatio(this.element_));
    };
    DisplayOnWideAspectRatio.prototype.destroy = function () {
        this.runOnCondition_.destroy();
    };
    return DisplayOnWideAspectRatio;
}());
export { DisplayOnWideAspectRatio };
//# sourceMappingURL=wide.js.map