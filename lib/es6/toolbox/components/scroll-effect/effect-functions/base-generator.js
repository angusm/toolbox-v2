import { set2dTranslation } from "../../../utils/dom/position/set-2d-translation";
import { Vector2d } from "../../../utils/math/geometry/vector-2d";
function generateBasicParallaxEffect(ratio) {
    return function (target, distance, distanceAsPercent) {
        var offset = distance * ratio;
        set2dTranslation(target, new Vector2d(0, offset));
    };
}
export { generateBasicParallaxEffect };
//# sourceMappingURL=base-generator.js.map