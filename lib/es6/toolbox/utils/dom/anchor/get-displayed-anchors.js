import { getStyle } from "../style/get-style";
function getDisplayedAnchors(querySelector) {
    return Array.from(document.querySelectorAll(querySelector))
        .filter(function (element) { return getStyle(element, 'display') !== 'none'; });
}
export { getDisplayedAnchors };
//# sourceMappingURL=get-displayed-anchors.js.map