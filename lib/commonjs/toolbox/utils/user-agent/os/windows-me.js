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
exports.WindowsME = void 0;
var base_1 = require("./base");
var WindowsME = (function (_super) {
    __extends(WindowsME, _super);
    function WindowsME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsME.name_ = 'Windows ME';
    WindowsME.regex_ = /(Win 9x 4.90|Windows ME)/;
    return WindowsME;
}(base_1.OS));
exports.WindowsME = WindowsME;
//# sourceMappingURL=windows-me.js.map