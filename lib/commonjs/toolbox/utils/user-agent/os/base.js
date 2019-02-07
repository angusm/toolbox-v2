"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("../string");
var OS = (function () {
    function OS() {
    }
    OS.getAsCSSModifier = function () {
        return this.name_.toLowerCase().replace(/\s/, '-');
    };
    OS.isCurrentOS = function () {
        return this.regex_.test(string_1.USER_AGENT_STRING);
    };
    return OS;
}());
exports.OS = OS;
//# sourceMappingURL=base.js.map