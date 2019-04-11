"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../../cached-vectors/scroll");
var get_style_1 = require("../../style/get-style");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
var scroll = scroll_1.Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return x + candidateElement.offsetLeft;
        }
        var transformVector = vector_2d_1.Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return x + invertedScroll.x;
}
function getVisibleDistanceFromRoot(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetLeft;
    }
    return element.offsetLeft +
        vector_2d_1.Vector2d.fromElementTransform(element).x +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
exports.getVisibleDistanceFromRoot = getVisibleDistanceFromRoot;
//# sourceMappingURL=get-visible-distance-from-root.js.map