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
import { MapWrapper } from './map-wrapper';
import { noop } from '../noop';
var DynamicDefaultMap = (function (_super) {
    __extends(DynamicDefaultMap, _super);
    function DynamicDefaultMap(iterable, InnerMapClass, defaultFunction) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        if (defaultFunction === void 0) { defaultFunction = noop; }
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
}(MapWrapper));
export { DynamicDefaultMap };
//# sourceMappingURL=dynamic-default.js.map