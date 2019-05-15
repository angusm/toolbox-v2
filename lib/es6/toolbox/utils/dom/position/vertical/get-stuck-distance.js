import { getStyle } from "../../style/get-style";
import { SCROLL_ELEMENT } from "../scroll-element";
function getStuckDistance(element) {
    var position = getStyle(element, 'position');
    if (position !== 'sticky' || element.offsetTop !== SCROLL_ELEMENT.scrollTop) {
        return 0;
    }
    else {
        var offsetParent = element.offsetParent;
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (getStyle(previousSibling, 'position') === 'sticky') {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            else {
                break;
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        var result = void 0;
        if (previousSibling !== null) {
            result =
                SCROLL_ELEMENT.scrollTop -
                    previousSiblingHeight -
                    previousSibling.offsetHeight -
                    previousSibling.offsetTop;
        }
        else if (offsetParent !== document.body) {
            result =
                SCROLL_ELEMENT.scrollTop -
                    previousSiblingHeight -
                    offsetParent.offsetTop;
        }
        else {
            result = SCROLL_ELEMENT.scrollTop - previousSiblingHeight;
        }
        return result;
    }
}
export { getStuckDistance };
//# sourceMappingURL=get-stuck-distance.js.map