import { ROOT_ELEMENT } from "../root-element";
function getAncestorHeight(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return ancestor ? ancestor.offsetHeight : ROOT_ELEMENT.clientHeight;
}
export { getAncestorHeight };
//# sourceMappingURL=get-ancestor-height.js.map