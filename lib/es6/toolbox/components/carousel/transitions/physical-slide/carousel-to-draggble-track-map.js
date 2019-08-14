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
import { Draggable } from "../../../draggable/draggable";
var DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();
var CarouselToDraggableTrackMap = (function (_super) {
    __extends(CarouselToDraggableTrackMap, _super);
    function CarouselToDraggableTrackMap() {
        var _this = this;
        var defaultFn = function (carousel) {
            var constraints = carousel.allowsLooping() ?
                [DEFAULT_CONSTRAINT] :
                [DEFAULT_CONSTRAINT, new PhysicalSlideConstraint(carousel)];
            return new Draggable(carousel.getTrack(), { constraints: constraints });
        };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return CarouselToDraggableTrackMap;
}(DynamicDefaultMap));
export { CarouselToDraggableTrackMap };
//# sourceMappingURL=carousel-to-draggble-track-map.js.map