import { getStyle } from "./get-style";
function getStyleAsFloat(element, style) {
    var parsedOpacity = parseFloat(getStyle(element, style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
export { getStyleAsFloat };
//# sourceMappingURL=get-style-as-float.js.map