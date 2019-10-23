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
var fixed_y_1 = require("../../../draggable/constraints/fixed-y");
var dynamic_default_1 = require("../../../../utils/map/dynamic-default");
var physical_slide_constraint_1 = require("./physical-slide-constraint");
var horizontally_draggable_1 = require("../../../draggable/horizontally-draggable");
var draggable_1 = require("../../../draggable/draggable");
var DEFAULT_CONSTRAINT = new fixed_y_1.DraggableFixedYConstraint();
var SlideToDraggableMap = (function (_super) {
    __extends(SlideToDraggableMap, _super);
    function SlideToDraggableMap(carousel, lockScroll) {
        if (lockScroll === void 0) { lockScroll = false; }
        var _this = this;
        var constraints = [];
        if (!lockScroll) {
            constraints.push(DEFAULT_CONSTRAINT);
        }
        if (!carousel.allowsLooping()) {
            constraints.push(new physical_slide_constraint_1.PhysicalSlideConstraint(carousel));
        }
        var options = { constraints: constraints };
        var defaultFn = lockScroll ?
            function (slide) { return new horizontally_draggable_1.HorizontallyDraggable(slide, options); } :
            function (slide) { return new draggable_1.Draggable(slide, options); };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return SlideToDraggableMap;
}(dynamic_default_1.DynamicDefaultMap));
exports.SlideToDraggableMap = SlideToDraggableMap;
//# sourceMappingURL=slide-to-draggble-map.js.map