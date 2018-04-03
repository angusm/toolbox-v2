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
var WindowsXP = (function (_super) {
    __extends(WindowsXP, _super);
    function WindowsXP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsXP.name_ = 'Windows XP';
    WindowsXP.regex_ = /(Windows NT 5.1|Windows XP)/;
    return WindowsXP;
}(base_1.OS));
exports.WindowsXP = WindowsXP;
//# sourceMappingURL=windows-xp.js.map