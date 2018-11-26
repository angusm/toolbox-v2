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
var BeOS = (function (_super) {
    __extends(BeOS, _super);
    function BeOS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeOS.name_ = 'BeOS';
    BeOS.regex_ = /BeOS/;
    return BeOS;
}(base_1.OS));
exports.BeOS = BeOS;
//# sourceMappingURL=beos.js.map