function removeClassModifiers(element, baseClass, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.blacklist, blacklist = _c === void 0 ? [] : _c, _d = _b.whitelist, whitelist = _d === void 0 ? [] : _d;
    Array.from(element.classList)
        .filter(function (className) {
        return className.indexOf(baseClass) === 0 &&
            blacklist.indexOf(className) === -1 &&
            (whitelist.length === 0 || whitelist.indexOf(className) !== -1);
    })
        .forEach(function (className) { return element.classList.remove(className); });
}
export { removeClassModifiers };
//# sourceMappingURL=remove-class-modifiers.js.map