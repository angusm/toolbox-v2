"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../cached-vectors/scroll");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var get_style_1 = require("../style/get-style");
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return new vector_2d_1.Vector2d(x + candidateElement.offsetLeft, y + candidateElement.offsetTop);
        }
        var transformVector = vector_2d_1.Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        y +=
            candidateElement.offsetTop +
                transformVector.y -
                candidateElement.scrollTop;
        candidateElement = candidateElement.offsetParent;
    }
    var scroll = scroll_1.Scroll.getSingleton(this);
    var invertedScroll = scroll.getPosition().invert();
    scroll.destroy(this);
    return new vector_2d_1.Vector2d(x + invertedScroll.x, y + invertedScroll.y);
}
function getVisibleDistanceFromRoot(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return vector_2d_1.Vector2d.fromElementOffset(element);
    }
    return vector_2d_1.Vector2d.add(vector_2d_1.Vector2d.fromElementOffset(element), vector_2d_1.Vector2d.fromElementTransform(element), getVisibleDistanceFromRoot_(element.offsetParent));
}
exports.getVisibleDistanceFromRoot = getVisibleDistanceFromRoot;
//# sourceMappingURL=get-visible-distance-from-root.js.map