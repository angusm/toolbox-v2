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
var base_1 = require("./base");
var Windows8 = (function (_super) {
    __extends(Windows8, _super);
    function Windows8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows8.name_ = 'Windows 8';
    Windows8.regex_ = /(Windows 8|Windows NT 6.2)/;
    return Windows8;
}(base_1.OS));
exports.Windows8 = Windows8;
//# sourceMappingURL=windows-8.js.map