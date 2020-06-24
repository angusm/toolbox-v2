"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var draggable_1 = require("./draggable");
var fixed_y_1 = require("./constraints/fixed-y");
var scroll_lock_service_1 = require("../scroll-lock-service/scroll-lock-service");
var zero_vector_2d_1 = require("../../utils/math/geometry/zero-vector-2d");
function weightedTrendsHorizontal(delta) {
    return (Math.abs(delta.getX()) * 1.05) > Math.abs(delta.getY());
}
var HorizontallyDraggable = (function (_super) {
    __extends(HorizontallyDraggable, _super);
    function HorizontallyDraggable(element, _a) {
        var _b = (_a === void 0 ? {} : _a).constraints, constraints = _b === void 0 ? [] : _b;
        var _this = this;
        var finalConstraints = constraints.concat([new fixed_y_1.DraggableFixedYConstraint()]);
        _this = _super.call(this, element, { constraints: finalConstraints }) || this;
        _this.dragDelta_ = zero_vector_2d_1.ZERO_VECTOR_2D;
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
                scroll_lock_service_1.ScrollLockService.getSingleton().lockScroll();
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
        this.dragDelta_ = zero_vector_2d_1.ZERO_VECTOR_2D;
        this.potentialInteractionStarted_ = false;
        _super.prototype.endInteraction_.call(this);
        scroll_lock_service_1.ScrollLockService.getSingleton().unlockScroll();
    };
    return HorizontallyDraggable;
}(draggable_1.Draggable));
exports.HorizontallyDraggable = HorizontallyDraggable;
//# sourceMappingURL=horizontally-draggable.js.map