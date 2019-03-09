"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../../cached-vectors/scroll");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
var get_style_1 = require("../../style/get-style");
var scroll = scroll_1.Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    vector_2d_1.Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRoot(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        vector_2d_1.Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
exports.getVisibleDistanceFromRoot = getVisibleDistanceFromRoot;
//# sourceMappingURL=get-visible-distance-from-root.js.map