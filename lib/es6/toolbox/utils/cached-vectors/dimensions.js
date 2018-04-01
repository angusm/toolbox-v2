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
var Dimensions = (function (_super) {
    __extends(Dimensions, _super);
    function Dimensions(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Dimensions.getVectorClass = function () {
        return Dimensions2d;
    };
    Dimensions.prototype.getDimensions = function () {
        return this.getCurrentVector();
    };
    Dimensions.prototype.getValues = function () {
        return [
            this.element ? this.element.offsetWidth : window.innerWidth,
            this.element ? this.element.offsetHeight : window.innerHeight
        ];
    };
    return Dimensions;
}(CachedElementVector));
export { Dimensions };
//# sourceMappingURL=dimensions.js.map