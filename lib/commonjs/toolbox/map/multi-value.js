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
var mapped_iterator_1 = require("../iterator/mapped-iterator");
var MultiValueMap = (function (_super) {
    __extends(MultiValueMap, _super);
    function MultiValueMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this, iterable, InnerMapClass) || this;
        _this.uidsToValue = new Map();
        var uid = 0;
        _this.uids = dynamic_default_1.DynamicDefaultMap.usingFunction(function (value) {
            var nextUid = uid++;
            _this.uidsToValue.set(nextUid, value);
            return nextUid;
        });
        return _this;
    }
    MultiValueMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.uidsToValue.clear();
        this.uids.clear();
    };
    MultiValueMap.prototype.convertToKey = function (keys) {
        var _this = this;
        return keys.map(function (key) { return _this.uids.get(key); }).join('-');
    };
    MultiValueMap.prototype.convertToValues = function (key) {
        var _this = this;
        return key.split('-').map(function (uid) { return _this.uidsToValue.get(parseInt(uid)); });
    };
    MultiValueMap.prototype.get = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return _super.prototype.get.call(this, this.convertToKey(keys));
    };
    MultiValueMap.prototype.delete = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return _super.prototype.delete.call(this, this.convertToKey(keys));
    };
    MultiValueMap.prototype.has = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return _super.prototype.has.call(this, this.convertToKey(keys));
    };
    MultiValueMap.prototype.keys = function () {
        var _this = this;
        return new mapped_iterator_1.MappedIterator(_super.prototype.keys.call(this), function (key) { return _this.convertToValues(key); });
    };
    MultiValueMap.prototype.set = function () {
        var keysAndValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keysAndValue[_i] = arguments[_i];
        }
        var keys = keysAndValue.slice(0, -1);
        var value = keysAndValue.slice(-1)[0];
        return _super.prototype.set.call(this, this.convertToKey(keys), value);
    };
    return MultiValueMap;
}(map_wrapper_1.MapWrapper));
exports.MultiValueMap = MultiValueMap;
//# sourceMappingURL=multi-value.js.map