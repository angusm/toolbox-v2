var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CachedElementVector } from './cached-element-vector';
import { Dimensions2d } from '../math/geometry/dimensions-2d';
import { getAncestorDimensions } from "../dom/position/get-ancestor-dimensions";
var Dimensions = (function (_super) {
    __extends(Dimensions, _super);
    function Dimensions(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Dimensions.prototype.getDimensions = function () {
        return this.getLastValue();
    };
    Dimensions.prototype.getValues = function () {
        return getAncestorDimensions(this.element).getValues();
    };
    Dimensions.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return CachedElementVector.getForElement.bind(this).apply(void 0, args);
    };
    Dimensions.getSingleton = function () {
        return CachedElementVector.getSingleton.bind(this)();
    };
    Dimensions.VectorClass = Dimensions2d;
    return Dimensions;
}(CachedElementVector));
export { Dimensions };
//# sourceMappingURL=dimensions.js.map