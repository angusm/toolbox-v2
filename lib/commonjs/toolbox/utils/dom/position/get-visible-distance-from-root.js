"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../cached-vectors/scroll");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var frame_memoize_1 = require("../../frame-memoize");
var get_style_1 = require("../style/get-style");
var scroll = scroll_1.Scroll.getSingleton();
var ZERO_VECTOR = new vector_2d_1.Vector2d();
function getVisibleDistanceFromRoot__(element) {
    if (!element || element === document.body) {
        return ZERO_VECTOR;
    }
    else {
        return vector_2d_1.Vector2d.add(vector_2d_1.Vector2d.fromElementOffset(element), vector_2d_1.Vector2d.fromElementTransform(element), vector_2d_1.Vector2d.fromElementScroll(element).invert(), memoized_(element.offsetParent));
    }
}
function getVisibleDistanceFromRoot_(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return vector_2d_1.Vector2d.fromElementOffset(element);
    }
    return vector_2d_1.Vector2d.add(scroll.getPosition().invert(), vector_2d_1.Vector2d.fromElementScroll(element), memoized_(element));
}
var memoized = frame_memoize_1.frameMemoize(getVisibleDistanceFromRoot_);
exports.getVisibleDistanceFromRoot = memoized;
var memoized_ = frame_memoize_1.frameMemoize(getVisibleDistanceFromRoot__);
//# sourceMappingURL=get-visible-distance-from-root.js.map