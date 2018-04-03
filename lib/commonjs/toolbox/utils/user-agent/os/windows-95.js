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
var Windows95 = (function (_super) {
    __extends(Windows95, _super);
    function Windows95() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows95.name_ = 'Windows 95';
    Windows95.regex_ = /(Windows 95|Win95|Windows_95)/;
    return Windows95;
}(base_1.OS));
exports.Windows95 = Windows95;
//# sourceMappingURL=windows-95.js.map