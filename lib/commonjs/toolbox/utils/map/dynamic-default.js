"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var map_wrapper_1 = require("./map-wrapper");
var noop_1 = require("../noop");
var DynamicDefaultMap = (function (_super) {
    __extends(DynamicDefaultMap, _super);
    function DynamicDefaultMap(iterable, InnerMapClass, defaultFunction) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        if (defaultFunction === void 0) { defaultFunction = noop_1.noop; }
        var _this = _super.call(this, [], InnerMapClass) || this;
        _this.defaultFunction = defaultFunction;
        _this.populateFromIterable(iterable);
        return _this;
    }
    DynamicDefaultMap.prototype.get = function (key) {
        if (!this.has(key)) {
            this.set(key, this.defaultFunction(key));
        }
        return _super.prototype.get.call(this, key);
    };
    DynamicDefaultMap.usingFunction = function (defaultFunction) {
        return new this([], Map, defaultFunction);
    };
    return DynamicDefaultMap;
}(map_wrapper_1.MapWrapper));
exports.DynamicDefaultMap = DynamicDefaultMap;
//# sourceMappingURL=dynamic-default.js.map