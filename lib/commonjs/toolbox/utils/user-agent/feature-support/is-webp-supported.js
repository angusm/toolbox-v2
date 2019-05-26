"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../math/numeric-range");
var edge_1 = require("../browser/edge");
var firefox_1 = require("../browser/firefox");
var chrome_1 = require("../browser/chrome");
var opera_1 = require("../browser/opera");
var is_feature_supported_1 = require("./is-feature-supported");
var webpSupportedBrowsers = new Map([
    [edge_1.Edge, new numeric_range_1.NumericRange(18, Number.POSITIVE_INFINITY)],
    [firefox_1.Firefox, new numeric_range_1.NumericRange(65, Number.POSITIVE_INFINITY)],
    [chrome_1.Chrome, new numeric_range_1.NumericRange(32, Number.POSITIVE_INFINITY)],
    [opera_1.Opera, new numeric_range_1.NumericRange(19, Number.POSITIVE_INFINITY)]
]);
function isWebpSupported(browser) {
    return is_feature_supported_1.isFeatureSupported(browser, webpSupportedBrowsers);
}
exports.isWebpSupported = isWebpSupported;
//# sourceMappingURL=is-webp-supported.js.map