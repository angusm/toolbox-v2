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
import { DraggableFixedYConstraint } from '../../../draggable/constraints/fixed-y';
import { DynamicDefaultMap } from '../../../../utils/map/dynamic-default';
import { PhysicalSlideConstraint } from "./physical-slide-constraint";
import { HorizontallyDraggable } from "../../../draggable/horizontally-draggable";
import { Draggable } from "../../../draggable/draggable";
var DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();
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
            constraints.push(new PhysicalSlideConstraint(carousel));
        }
        var options = { constraints: constraints };
        var defaultFn = lockScroll ?
            function (slide) { return new HorizontallyDraggable(slide, options); } :
            function (slide) { return new Draggable(slide, options); };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return SlideToDraggableMap;
}(DynamicDefaultMap));
export { SlideToDraggableMap };
//# sourceMappingURL=slide-to-draggble-map.js.map