"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip_1 = require("../iterator/zip");
function zip() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var listsAsIterators = lists.map(function (list) { return list[Symbol.iterator](); });
    return zip_1.zip.apply(void 0, listsAsIterators);
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map