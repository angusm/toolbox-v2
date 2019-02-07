import { getStyle } from "./get-style";
function getStyleAsInt(element, style) {
    var parsedOpacity = parseInt(getStyle(element, style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
export { getStyleAsInt };
//# sourceMappingURL=get-style-as-int.js.map