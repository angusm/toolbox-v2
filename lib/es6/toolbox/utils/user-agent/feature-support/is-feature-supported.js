function isFeatureSupported(browser, featureSupportMap) {
    if (!featureSupportMap.has(browser)) {
        return false;
    }
    var version = browser.getVersion();
    var range = featureSupportMap.get(browser);
    return range.contains(version);
}
export { isFeatureSupported };
//# sourceMappingURL=is-feature-supported.js.map