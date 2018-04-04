function getStyleAsInt(element, style) {
    var parsedOpacity = parseInt(getComputedStyle(element).getPropertyValue(style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
export { getStyleAsInt };
//# sourceMappingURL=get-style-as-int.js.map