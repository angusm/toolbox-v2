"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../../cached-vectors/scroll");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
var frame_memoize_1 = require("../../../frame-memoize");
var get_style_1 = require("../../style/get-style");
var scroll = scroll_1.Scroll.getSingleton();
function getVisibleDistanceFromRoot__(element) {
    if (!element || element === document.body) {
        return -scroll.getPosition().y;
    }
    else if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    else {
        return element.offsetTop +
            vector_2d_1.Vector2d.fromElementTransform(element).y -
            element.scrollTop +
            memoized_(element.offsetParent);
    }
}
function getVisibleDistanceFromRoot_(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        vector_2d_1.Vector2d.fromElementTransform(element).y +
        memoized_(element.offsetParent);
}
var memoized = frame_memoize_1.frameMemoize(getVisibleDistanceFromRoot_);
exports.getVisibleDistanceFromRoot = memoized;
var memoized_ = frame_memoize_1.frameMemoize(getVisibleDistanceFromRoot__);
//# sourceMappingURL=get-visible-distance-from-root.js.map