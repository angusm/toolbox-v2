function getStyleAsFloat(element, style) {
    var parsedOpacity = parseFloat(element.style.getPropertyValue(style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
export { getStyleAsFloat };
//# sourceMappingURL=get-style-as-float.js.map