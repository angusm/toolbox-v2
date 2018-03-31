goog.module('toolbox.map.multi_value');var module = module || {id: 'toolbox/map/multi-value.js'};
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

var dynamic_default_1 = goog.require('toolbox.map.dynamic_default');
var map_wrapper_1 = goog.require('toolbox.map.map_wrapper');
var mapped_iterator_1 = goog.require('toolbox.iterable_iterator.mapped_iterator');
var MultiValueMap = (function (_super) {
    __extends(MultiValueMap, _super);
    function MultiValueMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this, [], InnerMapClass) || this;
        _this.uid = 0;
        _this.uidToValue = new Map();
        _this.valueToUid = dynamic_default_1.DynamicDefaultMap.usingFunction(function (value) { return _this.getUid(value); });
        _this.stringToInternalKey = dynamic_default_1.DynamicDefaultMap.usingFunction(function (stringId) { return _this.stringIdToInternalKey(stringId); });
        _this.populateFromIterable(iterable);
        return _this;
    }
    MultiValueMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.uid = 0;
        this.uidToValue.clear();
        this.valueToUid.clear();
        this.stringToInternalKey.clear();
    };
    MultiValueMap.prototype.getUid = function (value) {
        var nextUid = this.uid++;
        this.uidToValue.set(nextUid, value);
        return nextUid;
    };
    MultiValueMap.prototype.getInternalKey = function (keys) {
        return this.stringToInternalKey.get(this.getStringId(keys));
    };
    MultiValueMap.prototype.getStringId = function (keys) {
        var _this = this;
        return keys.map(function (key) { return _this.valueToUid.get(key); }).join('-');
    };
    MultiValueMap.prototype.stringIdToInternalKey = function (key) {
        var _this = this;
        return key.split('-').map(function (uid) { return _this.uidToValue.get(parseInt(uid)); });
    };
    MultiValueMap.prototype.get = function (keys) {
        return _super.prototype.get.call(this, this.getInternalKey(keys));
    };
    MultiValueMap.prototype.delete = function (keys) {
        return _super.prototype.delete.call(this, this.getInternalKey(keys));
    };
    MultiValueMap.prototype.has = function (keys) {
        return _super.prototype.has.call(this, this.getInternalKey(keys));
    };
    MultiValueMap.prototype.keys = function () {
        return new mapped_iterator_1.MappedIterator(_super.prototype.keys.call(this), function (key) { return key.slice(); });
    };
    MultiValueMap.prototype.set = function (keys, value) {
        return _super.prototype.set.call(this, this.getInternalKey(keys), value);
    };
    return MultiValueMap;
}(map_wrapper_1.MapWrapper));
exports.MultiValueMap = MultiValueMap;
//# sourceMappingURL=multi-value.js.map