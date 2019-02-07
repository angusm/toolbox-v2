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
import { CachedElementVector } from './cached-element-vector';
import { Vector2d } from '../math/geometry/vector-2d';
import { getVisibleDistanceBetweenElements } from '../dom/position/get-visible-distance-between-elements';
var VisibleDistance = (function (_super) {
    __extends(VisibleDistance, _super);
    function VisibleDistance(element, container) {
        if (container === void 0) { container = null; }
        var _this = _super.call(this, element, container) || this;
        _this.container_ = container;
        return _this;
    }
    VisibleDistance.prototype.getDistance = function () {
        return this.getLastValue();
    };
    VisibleDistance.prototype.getValues = function () {
        return getVisibleDistanceBetweenElements(this.element, this.container_)
            .getValues();
    };
    VisibleDistance.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return CachedElementVector.getForElement.bind(this).apply(void 0, args);
    };
    VisibleDistance.getSingleton = function () {
        return CachedElementVector.getSingleton.bind(this)();
    };
    VisibleDistance.VectorClass = Vector2d;
    return VisibleDistance;
}(CachedElementVector));
export { VisibleDistance };
//# sourceMappingURL=visible-distance.js.map