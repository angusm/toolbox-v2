"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../../map/dynamic-default");
var RESULT_KEY = Symbol('result');
var cachedResult = dynamic_default_1.DynamicDefaultMap.usingFunction(function (val) {
    if (val !== RESULT_KEY) {
        console.error('Browser check function called in unusual way.');
    }
    var table = document.createElement('div');
    table.style.display = 'table';
    var spacing = document.createElement('div');
    spacing.style.display = 'table-row';
    spacing.style.height = '200px';
    var tableRow = document.createElement('div');
    tableRow.style.display = 'table-row';
    tableRow.style.position = 'relative';
    var tableCell = document.createElement('div');
    tableCell.style.display = 'table-cell';
    var target = document.createElement('div');
    target.style.display = 'inline-block';
    target.style.height = '100px';
    target.style.width = '100px';
    table.appendChild(spacing);
    table.appendChild(tableRow);
    tableRow.appendChild(tableCell);
    tableCell.appendChild(target);
    document.body.appendChild(table);
    var result = tableRow.offsetParent === table &&
        tableRow.offsetTop === 200 &&
        tableCell.offsetParent === tableRow &&
        tableCell.offsetTop === 200 &&
        target.offsetParent === tableRow &&
        target.offsetTop === 200;
    document.body.removeChild(table);
    return result;
});
function browserHasChrome64TableDisplayOffsetIssues() {
    return cachedResult.get(RESULT_KEY);
}
exports.browserHasChrome64TableDisplayOffsetIssues = browserHasChrome64TableDisplayOffsetIssues;
//# sourceMappingURL=browser-has-chrome64-table-display-offset-issues.js.map