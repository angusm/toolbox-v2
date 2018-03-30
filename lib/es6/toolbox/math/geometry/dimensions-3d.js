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
import { Vector2d } from './vector-2d';
var Dimensions3D = (function (_super) {
    __extends(Dimensions3D, _super);
    function Dimensions3D(width, height, depth) {
        return _super.call(this, width, height, depth) || this;
    }
    Object.defineProperty(Dimensions3D.prototype, "depth", {
        get: function () {
            return this.getValues()[2];
        },
        enumerable: true,
        configurable: true
    });
    return Dimensions3D;
}(Vector2d));
export { Dimensions3D };
//# sourceMappingURL=dimensions-3d.js.map