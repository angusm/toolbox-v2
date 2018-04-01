"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../cached-vectors/scroll");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var frame_memoize_1 = require("../../frame-memoize");
var scroll = scroll_1.Scroll.getSingleton();
var memoized = frame_memoize_1.frameMemoize(getVisibleDistanceFromAncestor_);
exports.getVisibleDistanceFromAncestor = memoized;
var memoized_ = frame_memoize_1.frameMemoize(getVisibleDistanceFromAncestor__);
var ZERO_VECTOR = new vector_2d_1.Vector2d();
function getVisibleDistanceFromAncestor__(element, ancestor) {
    if (!element || element === document.body) {
        return ZERO_VECTOR;
    }
    else if (element === ancestor) {
        return vector_2d_1.Vector2d.fromElementScroll(element).invert();
    }
    else {
        return vector_2d_1.Vector2d.add(vector_2d_1.Vector2d.fromElementOffset(element), vector_2d_1.Vector2d.fromElementTransform(element), vector_2d_1.Vector2d.fromElementScroll(element).invert(), memoized_(element.offsetParent, ancestor));
    }
}
function getVisibleDistanceFromAncestor_(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return vector_2d_1.Vector2d.add(ancestor ? ZERO_VECTOR : scroll.getPosition().invert(), vector_2d_1.Vector2d.fromElementScroll(element), memoized_(element, ancestor));
}
//# sourceMappingURL=get-visible-distance-from-ancestor.js.map