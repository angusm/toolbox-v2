var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Draggable } from "./draggable";
import { DraggableFixedYConstraint } from "./constraints/fixed-y";
import { ScrollLockService } from "../scroll-lock-service/scroll-lock-service";
import { ZERO_VECTOR_2D } from "../../utils/math/geometry/zero-vector-2d";
function weightedTrendsHorizontal(delta) {
    return (Math.abs(delta.getX()) * 1.05) > Math.abs(delta.getY());
}
var HorizontallyDraggable = (function (_super) {
    __extends(HorizontallyDraggable, _super);
    function HorizontallyDraggable(element, _a) {
        var _b = (_a === void 0 ? {} : _a).constraints, constraints = _b === void 0 ? [] : _b;
        var _this = this;
        var finalConstraints = __spreadArrays(constraints, [new DraggableFixedYConstraint()]);
        _this = _super.call(this, element, { constraints: finalConstraints }) || this;
        _this.dragDelta_ = ZERO_VECTOR_2D;
        _this.potentialInteractionStarted_ = false;
        return _this;
    }
    HorizontallyDraggable.prototype.startInteraction_ = function () {
        this.potentialInteractionStarted_ = true;
    };
    HorizontallyDraggable.prototype.renderDrag_ = function () {
        if (!this.potentialInteractionStarted_) {
            return;
        }
        var delta = this.cursor_.getClient().getPressedFrameDelta();
        if (delta.getLength() === 0) {
            return;
        }
        if (!this.isInteracting_()) {
            if (weightedTrendsHorizontal(delta)) {
                ScrollLockService.getSingleton().lockScroll();
                this.dragDelta_ = delta;
                _super.prototype.startInteraction_.call(this);
            }
            else {
                this.potentialInteractionStarted_ = false;
            }
        }
        else {
            this.dragDelta_ = this.dragDelta_.add(delta);
            if (!weightedTrendsHorizontal(this.dragDelta_)) {
                this.endInteraction_();
                return;
            }
        }
        _super.prototype.renderDrag_.call(this);
    };
    HorizontallyDraggable.prototype.endInteraction_ = function () {
        if (!this.interacting_) {
            return;
        }
        this.dragDelta_ = ZERO_VECTOR_2D;
        this.potentialInteractionStarted_ = false;
        _super.prototype.endInteraction_.call(this);
        ScrollLockService.getSingleton().unlockScroll();
    };
    return HorizontallyDraggable;
}(Draggable));
export { HorizontallyDraggable };
//# sourceMappingURL=horizontally-draggable.js.map