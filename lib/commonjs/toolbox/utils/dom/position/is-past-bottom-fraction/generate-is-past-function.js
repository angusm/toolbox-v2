"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIsPastFunction = void 0;
var dimensions_2d_1 = require("../../../math/geometry/dimensions-2d");
var get_visible_distance_between_elements_1 = require("../get-visible-distance-between-elements");
function generateIsPastFunction(fraction) {
    return function (target, container) {
        if (container === void 0) { container = null; }
        var yDistance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container).y;
        var threeQuartersHeight = dimensions_2d_1.Dimensions2d.fromElementOffset(container).height * (1 - fraction);
        return yDistance < threeQuartersHeight;
    };
}
exports.generateIsPastFunction = generateIsPastFunction;
//# sourceMappingURL=generate-is-past-function.js.map