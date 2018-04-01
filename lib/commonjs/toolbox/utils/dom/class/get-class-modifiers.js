"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClassModifiers(element, baseClass) {
    var base = baseClass + "--";
    return Array.from(element.classList)
        .filter(function (candidate) { return candidate.indexOf(base) === 0; })
        .map(function (matchingClass) { return matchingClass.split(base).slice(1).join(base); });
}
exports.getClassModifiers = getClassModifiers;
//# sourceMappingURL=get-class-modifiers.js.map