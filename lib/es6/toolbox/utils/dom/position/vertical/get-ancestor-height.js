import { SCROLL_ELEMENT } from "../scroll-element";
function getAncestorHeight(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return ancestor ? ancestor.offsetHeight : SCROLL_ELEMENT.clientHeight;
}
export { getAncestorHeight };
//# sourceMappingURL=get-ancestor-height.js.map