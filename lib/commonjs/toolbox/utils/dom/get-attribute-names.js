"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeNames = void 0;
function getAttributeNames(element) {
    return Array.from(element.attributes).map(function (attribute) { return attribute.name; });
}
exports.getAttributeNames = getAttributeNames;
//# sourceMappingURL=get-attribute-names.js.map