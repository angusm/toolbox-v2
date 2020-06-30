"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTableDisplayed = void 0;
var to_bool_1 = require("../../to-bool");
var TABLE_DISPLAY_STYLES = [
    'table',
    'table-cell',
    'table-row',
];
function isTableDisplayed(element) {
    return to_bool_1.toBool(TABLE_DISPLAY_STYLES.find(function (style) { return element.style.display === style; }));
}
exports.isTableDisplayed = isTableDisplayed;
//# sourceMappingURL=is-table-displayed.js.map