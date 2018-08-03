"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_element_bottoms_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms");
var get_visible_distance_between_element_centers_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-centers");
var get_visible_distance_between_elements_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-elements");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var negate_numeric_function_1 = require("../../utils/functions/negate-numeric-function");
var scroll = scroll_1.Scroll.getSingleton();
var DistanceFunction = (function () {
    function DistanceFunction() {
    }
    DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = negate_numeric_function_1.negateNumericFunction(get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = negate_numeric_function_1.negateNumericFunction(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = negate_numeric_function_1.negateNumericFunction(get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms);
    DistanceFunction.DOCUMENT_SCROLL = function (unused_a, unused_b) { return scroll.getPosition().y; };
    return DistanceFunction;
}());
exports.DistanceFunction = DistanceFunction;
//# sourceMappingURL=distance-function.js.map