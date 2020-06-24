"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_element_bottoms_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms");
var get_visible_distance_between_element_centers_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-centers");
var negate_numeric_function_1 = require("../../utils/functions/negate-numeric-function");
var get_visible_distance_from_root_1 = require("../../utils/dom/position/vertical/get-visible-distance-from-root");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var DistanceFunction = (function () {
    function DistanceFunction() {
    }
    DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = negate_numeric_function_1.negateNumericFunction(get_visible_distance_from_root_1.getVisibleDistanceFromRoot);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = negate_numeric_function_1.negateNumericFunction(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = negate_numeric_function_1.negateNumericFunction(get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms);
    DistanceFunction.DOCUMENT_SCROLL = function () { return window.pageYOffset || scroll_element_1.SCROLL_ELEMENT.scrollTop; };
    return DistanceFunction;
}());
exports.DistanceFunction = DistanceFunction;
//# sourceMappingURL=distance-function.js.map