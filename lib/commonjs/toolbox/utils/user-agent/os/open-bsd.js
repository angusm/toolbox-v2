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
exports.OpenBSD = void 0;
var base_1 = require("./base");
var OpenBSD = (function (_super) {
    __extends(OpenBSD, _super);
    function OpenBSD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenBSD.name_ = 'Open BSD';
    OpenBSD.regex_ = /OpenBSD/;
    return OpenBSD;
}(base_1.OS));
exports.OpenBSD = OpenBSD;
//# sourceMappingURL=open-bsd.js.map