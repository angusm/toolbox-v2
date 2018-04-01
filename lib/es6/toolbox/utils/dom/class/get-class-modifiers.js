function getClassModifiers(element, baseClass) {
    return Array.from(element.classList)
        .filter(function (candidate) { return candidate.indexOf(baseClass + "--") === 0; })
        .map(function (matchingClass) { return matchingClass.split('--').slice(1).join('--'); });
}
export { getClassModifiers };
//# sourceMappingURL=get-class-modifiers.js.map