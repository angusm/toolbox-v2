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
exports.Unix = void 0;
var base_1 = require("./base");
var Unix = (function (_super) {
    __extends(Unix, _super);
    function Unix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Unix.name_ = 'UNIX';
    Unix.regex_ = /UNIX/;
    return Unix;
}(base_1.OS));
exports.Unix = Unix;
//# sourceMappingURL=unix.js.map