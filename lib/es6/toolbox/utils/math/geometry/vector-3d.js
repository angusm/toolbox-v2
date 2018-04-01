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
var Vector3d = (function (_super) {
    __extends(Vector3d, _super);
    function Vector3d(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return _super.apply(this, [x, y, z].concat(args)) || this;
    }
    Object.defineProperty(Vector3d.prototype, "z", {
        get: function () {
            return this.getValues()[2];
        },
        enumerable: true,
        configurable: true
    });
    return Vector3d;
}(Vector2d));
export { Vector3d };
//# sourceMappingURL=vector-3d.js.map