function getAttributeValue(element, attributeName) {
    var attribute = element.attributes.getNamedItem(attributeName);
    return attribute ? attribute.value : undefined;
}
export { getAttributeValue };
//# sourceMappingURL=get-attribute-value.js.map