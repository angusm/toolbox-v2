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
var draggable_1 = require("../../../draggable/draggable");
var DEFAULT_CONSTRAINT = new fixed_y_1.DraggableFixedYConstraint();
var CarouselToDraggableTrackMap = (function (_super) {
    __extends(CarouselToDraggableTrackMap, _super);
    function CarouselToDraggableTrackMap() {
        var _this = this;
        var defaultFn = function (carousel) {
            var constraints = carousel.allowsLooping() ?
                [DEFAULT_CONSTRAINT] :
                [DEFAULT_CONSTRAINT, new physical_slide_constraint_1.PhysicalSlideConstraint(carousel)];
            return new draggable_1.Draggable(carousel.getTrack(), { constraints: constraints });
        };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return CarouselToDraggableTrackMap;
}(dynamic_default_1.DynamicDefaultMap));
exports.CarouselToDraggableTrackMap = CarouselToDraggableTrackMap;
//# sourceMappingURL=carousel-to-draggble-track-map.js.map