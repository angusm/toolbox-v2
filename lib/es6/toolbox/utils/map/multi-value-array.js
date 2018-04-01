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
import { ArrayMap } from './array';
import { MultiValueMap } from './multi-value';
var MultiValueArrayMap = (function (_super) {
    __extends(MultiValueArrayMap, _super);
    function MultiValueArrayMap(iterable, InnerMapClass) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        var _this = _super.call(this) || this;
        _this.replaceInnerMap(new ArrayMap(iterable, InnerMapClass));
        return _this;
    }
    return MultiValueArrayMap;
}(MultiValueMap));
export { MultiValueArrayMap };
//# sourceMappingURL=multi-value-array.js.map