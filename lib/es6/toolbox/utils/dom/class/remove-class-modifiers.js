function removeClassModifiers(element, baseClass, blacklist) {
    if (blacklist === void 0) { blacklist = []; }
    Array.from(element.classList)
        .filter(function (className) {
        return className.indexOf(baseClass) === 0 &&
            blacklist.indexOf(className) === -1;
    })
        .forEach(function (className) { return element.classList.remove(className); });
}
export { removeClassModifiers };
//# sourceMappingURL=remove-class-modifiers.js.map