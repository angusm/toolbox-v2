"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("./dynamic-default");
var map_wrapper_1 = require("./map-wrapper");
var ArrayMap = (function (_super) {
    __extends(ArrayMap, _super);
    function ArrayMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this) || this;
        _this.replaceInnerMap(new dynamic_default_1.DynamicDefaultMap(iterable, InnerMapClass, function (key) { return []; }));
        return _this;
    }
    ArrayMap.prototype.get = function (key) {
        return _super.prototype.get.call(this, key);
    };
    ArrayMap.prototype.set = function (key, value) {
        return _super.prototype.set.call(this, key, value);
    };
    return ArrayMap;
}(map_wrapper_1.MapWrapper));
exports.ArrayMap = ArrayMap;
//# sourceMappingURL=array.js.map