"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAttributeValue(element, attributeName) {
    var attribute = element.attributes.getNamedItem(attributeName);
    return attribute ? attribute.value : undefined;
}
exports.getAttributeValue = getAttributeValue;
//# sourceMappingURL=get-attribute-value.js.map