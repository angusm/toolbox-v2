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
var Windows10 = (function (_super) {
    __extends(Windows10, _super);
    function Windows10() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows10.name_ = 'Windows 10';
    Windows10.regex_ = /(Windows 10.0|Windows NT 10.0)/;
    return Windows10;
}(base_1.OS));
exports.Windows10 = Windows10;
//# sourceMappingURL=windows-10.js.map