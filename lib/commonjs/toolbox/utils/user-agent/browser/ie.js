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
var base_1 = require("./base");
var IE = (function (_super) {
    __extends(IE, _super);
    function IE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IE.name_ = 'IE';
    IE.uaidsWithOffsets_ = [
        ['MSIE', [['MSIE', 5]]],
        ['Trident/', [['rv:', 3]]]
    ];
    return IE;
}(base_1.Browser));
exports.IE = IE;
//# sourceMappingURL=ie.js.map