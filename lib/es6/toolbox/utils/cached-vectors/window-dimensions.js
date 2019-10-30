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
import { Dimensions2d } from '../math/geometry/dimensions-2d';
import { ErrorService } from "../error/service";
var WindowDimensions = (function (_super) {
    __extends(WindowDimensions, _super);
    function WindowDimensions(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    WindowDimensions.prototype.getValues = function () {
        return Dimensions2d.fromInnerWindow().getValues();
    };
    WindowDimensions.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        ErrorService.throw('WindowDimensions should not be used with elements');
        return new WindowDimensions();
    };
    WindowDimensions.getSingleton = function () {
        return CachedElementVector.getSingleton.bind(this)();
    };
    WindowDimensions.VectorClass = Dimensions2d;
    return WindowDimensions;
}(CachedElementVector));
export { WindowDimensions };
//# sourceMappingURL=window-dimensions.js.map