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
var dynamic_default_1 = require("./dynamic-default");
var multi_value_1 = require("./multi-value");
var noop_1 = require("../noop");
var MultiValueDynamicDefaultMap = (function (_super) {
    __extends(MultiValueDynamicDefaultMap, _super);
    function MultiValueDynamicDefaultMap(iterable, InnerMapClass, defaultFunction) {
        if (iterable === void 0) { iterable = []; }
        if (InnerMapClass === void 0) { InnerMapClass = Map; }
        if (defaultFunction === void 0) { defaultFunction = noop_1.noop; }
        var _this = _super.call(this) || this;
        _this.replaceInnerMap(new dynamic_default_1.DynamicDefaultMap(iterable, InnerMapClass, defaultFunction));
        return _this;
    }
    MultiValueDynamicDefaultMap.usingFunction = function (defaultFunction) {
        return new MultiValueDynamicDefaultMap([], Map, defaultFunction);
    };
    return MultiValueDynamicDefaultMap;
}(multi_value_1.MultiValueMap));
exports.MultiValueDynamicDefaultMap = MultiValueDynamicDefaultMap;
//# sourceMappingURL=multi-value-dynamic-default.js.map