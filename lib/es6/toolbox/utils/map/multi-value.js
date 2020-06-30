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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { DynamicDefaultMap } from './dynamic-default';
import { MapWrapper } from './map-wrapper';
import { MappedIterator } from '../iterable-iterator/mapped-iterator';
var MultiValueMap = (function (_super) {
    __extends(MultiValueMap, _super);
    function MultiValueMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this, [], InnerMapClass) || this;
        _this.uid_ = 0;
        _this.valueToUid_ =
            DynamicDefaultMap.usingFunction(function (value) { return _this.uid_++; });
        _this.internalKeyToArray_ = new Map();
        _this.populateFromIterable(iterable);
        return _this;
    }
    MultiValueMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.uid_ = 0;
        this.valueToUid_.clear();
    };
    MultiValueMap.prototype.getInternalKey_ = function (keys) {
        var _this = this;
        var stringId = keys.map(function (key) { return _this.valueToUid_.get(key); }).join('-');
        if (!this.internalKeyToArray_.has(stringId)) {
            this.internalKeyToArray_.set(stringId, keys.slice());
        }
        return this.internalKeyToArray_.get(stringId);
    };
    MultiValueMap.prototype.get = function (keys) {
        return _super.prototype.get.call(this, this.getInternalKey_(keys));
    };
    MultiValueMap.prototype.delete = function (keys) {
        return _super.prototype.delete.call(this, this.getInternalKey_(keys));
    };
    MultiValueMap.prototype.has = function (keys) {
        return _super.prototype.has.call(this, this.getInternalKey_(keys));
    };
    MultiValueMap.prototype.keys = function () {
        return new MappedIterator(_super.prototype.keys.call(this), function (key) { return key ? __spreadArrays(key) : []; });
    };
    MultiValueMap.prototype.set = function (keys, value) {
        return _super.prototype.set.call(this, this.getInternalKey_(keys), value);
    };
    return MultiValueMap;
}(MapWrapper));
export { MultiValueMap };
//# sourceMappingURL=multi-value.js.map