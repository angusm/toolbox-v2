import { getStyle } from "../../style/get-style";
var ignoredPositions = new Set(['fixed', 'absolute']);
function getOffsetTopIgnoringSticky(element) {
    var position = getStyle(element, 'position');
    if (position !== 'sticky') {
        return element.offsetTop;
    }
    else {
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (!ignoredPositions.has(getStyle(previousSibling, 'position'))) {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        return previousSiblingHeight;
    }
}
export { getOffsetTopIgnoringSticky };
//# sourceMappingURL=get-offset-top-ignoring-sticky.js.map