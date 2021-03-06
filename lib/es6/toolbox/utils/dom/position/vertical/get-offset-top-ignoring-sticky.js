import { getStyle } from "../../style/get-style";
var ignoredPositions = new Set(['fixed', 'absolute']);
function getPreviousSiblingHeight(element) {
    var previousSiblingHeight = 0;
    var previousSibling = element.previousElementSibling;
    while (previousSibling) {
        var previousSiblingPosition = getStyle(previousSibling, 'position');
        if (!ignoredPositions.has(previousSiblingPosition)) {
            if (previousSiblingPosition === 'sticky') {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            else {
                previousSiblingHeight +=
                    previousSibling.offsetTop + previousSibling.offsetHeight;
                break;
            }
        }
        previousSibling = previousSibling.previousElementSibling;
    }
    return previousSiblingHeight;
}
function getOffsetTopIgnoringSticky(element) {
    var position = getStyle(element, 'position');
    if (position !== 'sticky') {
        return element.offsetTop;
    }
    else {
        var previousSiblingHeight = getPreviousSiblingHeight(element);
        var previousParent = element.parentElement;
        var parentPreviousSiblingHeight = 0;
        while (previousParent !== element.offsetParent) {
            parentPreviousSiblingHeight += getPreviousSiblingHeight(previousParent);
            previousParent = previousParent.parentElement;
        }
        return previousSiblingHeight + parentPreviousSiblingHeight;
    }
}
export { getOffsetTopIgnoringSticky };
//# sourceMappingURL=get-offset-top-ignoring-sticky.js.map