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
import { DynamicDefaultMap } from './dynamic-default';
import { MultiValueMap } from './multi-value';
import { noop } from '../noop';
var MultiValueDynamicDefaultMap = (function (_super) {
    __extends(MultiValueDynamicDefaultMap, _super);
    function MultiValueDynamicDefaultMap(iterable, InnerMapClass, defaultFunction) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        if (defaultFunction === void 0) { defaultFunction = noop; }
        var _this = _super.call(this) || this;
        _this.replaceInnerMap(new DynamicDefaultMap(iterable, InnerMapClass, defaultFunction));
        return _this;
    }
    MultiValueDynamicDefaultMap.usingFunction = function (defaultFunction) {
        return new MultiValueDynamicDefaultMap([], Map, defaultFunction);
    };
    return MultiValueDynamicDefaultMap;
}(MultiValueMap));
export { MultiValueDynamicDefaultMap };
//# sourceMappingURL=multi-value-dynamic-default.js.map