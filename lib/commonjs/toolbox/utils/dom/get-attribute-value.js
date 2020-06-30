"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeValue = void 0;
function getAttributeValue(element, attributeName) {
    var attribute = element.attributes.getNamedItem(attributeName);
    return attribute ? attribute.value : undefined;
}
exports.getAttributeValue = getAttributeValue;
//# sourceMappingURL=get-attribute-value.js.map