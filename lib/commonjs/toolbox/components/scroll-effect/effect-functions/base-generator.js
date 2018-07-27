"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var set_2d_translation_1 = require("../../../utils/dom/position/set-2d-translation");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
function generateBasicParallaxEffect(ratio) {
    return function (target, distance, distanceAsPercent) {
        var offset = distance * ratio;
        set_2d_translation_1.set2dTranslation(target, new vector_2d_1.Vector2d(0, offset));
    };
}
exports.generateBasicParallaxEffect = generateBasicParallaxEffect;
//# sourceMappingURL=base-generator.js.map