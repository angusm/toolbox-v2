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
var Mac = (function (_super) {
    __extends(Mac, _super);
    function Mac() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mac.name_ = 'Mac UserAgent';
    Mac.regex_ = /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/;
    return Mac;
}(base_1.OS));
exports.Mac = Mac;
//# sourceMappingURL=mac.js.map