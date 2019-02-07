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
import { DynamicDefaultMap } from './dynamic-default';
import { MapWrapper } from './map-wrapper';
var ArrayMap = (function (_super) {
    __extends(ArrayMap, _super);
    function ArrayMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this, iterable, InnerMapClass) || this;
        _this.replaceInnerMap(new DynamicDefaultMap(iterable, InnerMapClass, function (key) { return []; }));
        return _this;
    }
    return ArrayMap;
}(MapWrapper));
export { ArrayMap };
//# sourceMappingURL=array.js.map