"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zip() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    return lists.slice().reduce(function (result, list) {
        list.forEach(function (listItem, index) {
            result[index] = (result[index] || []).concat([listItem]);
        });
        return result;
    }, []);
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map