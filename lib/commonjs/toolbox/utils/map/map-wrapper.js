"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapWrapper = void 0;
var is_defined_1 = require("../is-defined");
var MapWrapper = (function () {
    function MapWrapper(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        this.map = new InnerMapClass();
        this.populateFromIterable(iterable);
    }
    MapWrapper.prototype.populateFromIterable = function (iterable) {
        var _this = this;
        iterable.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return _this.set(key, value);
        });
    };
    MapWrapper.prototype.replaceInnerMap = function (innerMap) {
        this.map = innerMap;
    };
    Object.defineProperty(MapWrapper.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: false,
        configurable: true
    });
    MapWrapper.prototype.clear = function () {
        this.map.clear();
    };
    MapWrapper.prototype.delete = function (key) {
        return this.map.delete(key);
    };
    MapWrapper.prototype.entries = function () {
        return this.map.entries();
    };
    MapWrapper.prototype.forEach = function (callbackFn, thisArg) {
        var finalThisArg = is_defined_1.isDefined(thisArg) ? thisArg : this;
        this.map.forEach(callbackFn, finalThisArg);
    };
    MapWrapper.prototype.get = function (key) {
        return this.map.get(key);
    };
    MapWrapper.prototype.has = function (key) {
        return this.map.has(key);
    };
    MapWrapper.prototype.keys = function () {
        return this.map.keys();
    };
    MapWrapper.prototype.set = function (key, value) {
        this.map.set(key, value);
        return this;
    };
    MapWrapper.prototype.values = function () {
        return this.map.values();
    };
    MapWrapper.prototype[Symbol.iterator] = function () {
        return this.map[Symbol.iterator]();
    };
    return MapWrapper;
}());
exports.MapWrapper = MapWrapper;
//# sourceMappingURL=map-wrapper.js.map