"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../../style/get-style");
var scroll_element_1 = require("../scroll-element");
function getStuckDistance(element) {
    var position = get_style_1.getStyle(element, 'position');
    if (position !== 'sticky' || element.offsetTop !== scroll_element_1.SCROLL_ELEMENT.scrollTop) {
        return 0;
    }
    else {
        var offsetParent = element.offsetParent;
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (get_style_1.getStyle(previousSibling, 'position') === 'sticky') {
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
                scroll_element_1.SCROLL_ELEMENT.scrollTop -
                    previousSiblingHeight -
                    previousSibling.offsetHeight -
                    previousSibling.offsetTop;
        }
        else if (offsetParent !== document.body) {
            result =
                scroll_element_1.SCROLL_ELEMENT.scrollTop -
                    previousSiblingHeight -
                    offsetParent.offsetTop;
        }
        else {
            result = scroll_element_1.SCROLL_ELEMENT.scrollTop - previousSiblingHeight;
        }
        return result;
    }
}
exports.getStuckDistance = getStuckDistance;
//# sourceMappingURL=get-stuck-distance.js.map