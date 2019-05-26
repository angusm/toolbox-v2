"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../math/numeric-range");
var edge_1 = require("../browser/edge");
var firefox_1 = require("../browser/firefox");
var chrome_1 = require("../browser/chrome");
var opera_1 = require("../browser/opera");
var webmSupportedBrowsers = new Map([
    [edge_1.Edge, new numeric_range_1.NumericRange(75, Number.POSITIVE_INFINITY)],
    [firefox_1.Firefox, new numeric_range_1.NumericRange(28, Number.POSITIVE_INFINITY)],
    [chrome_1.Chrome, new numeric_range_1.NumericRange(25, Number.POSITIVE_INFINITY)],
    [opera_1.Opera, new numeric_range_1.NumericRange(16, Number.POSITIVE_INFINITY)]
]);
exports.webmSupportedBrowsers = webmSupportedBrowsers;
//# sourceMappingURL=webm-supported-browsers.js.map