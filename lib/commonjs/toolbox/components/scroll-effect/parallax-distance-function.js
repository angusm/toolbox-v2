"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_element_bottoms_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms");
var get_visible_distance_between_element_centers_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-centers");
var get_visible_distance_between_elements_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-elements");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var scroll = scroll_1.Scroll.getSingleton();
var ParallaxDistanceFunction = (function () {
    function ParallaxDistanceFunction() {
    }
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements;
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters;
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms;
    ParallaxDistanceFunction.DOCUMENT_SCROLL = function (unused_a, unused_b) { return scroll.getPosition().y; };
    return ParallaxDistanceFunction;
}());
exports.ParallaxDistanceFunction = ParallaxDistanceFunction;
//# sourceMappingURL=parallax-distance-function.js.map