"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFeatureSupported(browser, featureSupportMap) {
    var version = browser.getVersion();
    var range = featureSupportMap.get(browser);
    return range.contains(version);
}
exports.isFeatureSupported = isFeatureSupported;
//# sourceMappingURL=is-feature-supported.js.map