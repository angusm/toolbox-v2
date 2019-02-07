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
var Windows7 = (function (_super) {
    __extends(Windows7, _super);
    function Windows7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows7.name_ = 'Windows 7';
    Windows7.regex_ = /(Windows 7|Windows NT 6.1)/;
    return Windows7;
}(base_1.OS));
exports.Windows7 = Windows7;
//# sourceMappingURL=windows-7.js.map