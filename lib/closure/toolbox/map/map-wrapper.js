goog.module('toolbox.map.map_wrapper');var module = module || {id: 'toolbox/map/map-wrapper.js'};

var is_def_1 = goog.require('toolbox.is_def');
var MapWrapper = (function () {
    function MapWrapper(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = this;
        this.map = new InnerMapClass();
        iterable.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return _this.map.set(key, value);
        });
    }
    MapWrapper.prototype.replaceInnerMap = function (innerMap) {
        this.map = innerMap;
    };
    Object.defineProperty(MapWrapper.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
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
        var finalThisArg = is_def_1.isDef(thisArg) ? thisArg : this;
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