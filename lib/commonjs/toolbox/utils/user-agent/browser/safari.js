"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var multi_value_1 = require("../../map/multi-value");
var Safari = (function (_super) {
    __extends(Safari, _super);
    function Safari() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Safari.name_ = 'Safari';
    Safari.uaidsWithOffsets_ = [
        ['Safari', [['Version', 8], ['Safari', 7]]]
    ];
    Safari.genericStyleValueToSupported_ = new multi_value_1.MultiValueMap([
        [['position', 'sticky'], '-webkit-sticky'],
    ]);
    return Safari;
}(base_1.Browser));
exports.Safari = Safari;
//# sourceMappingURL=safari.js.map