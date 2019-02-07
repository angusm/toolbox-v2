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
var Windows2000 = (function (_super) {
    __extends(Windows2000, _super);
    function Windows2000() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows2000.name_ = 'Windows 2000';
    Windows2000.regex_ = /(Windows NT 5.0|Windows 2000)/;
    return Windows2000;
}(base_1.OS));
exports.Windows2000 = Windows2000;
//# sourceMappingURL=windows-2000.js.map