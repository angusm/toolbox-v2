import { getSign } from "../math/get-sign";
import { wrapIndex } from "./wrap-index";
function loopSlice(values, startIndex, rawEndIndex, direction) {
    var result = [];
    var length = values.length;
    var increment = getSign(direction);
    var endIndex = wrapIndex(rawEndIndex, length);
    var index = wrapIndex(startIndex, length);
    while (index !== endIndex) {
        result.push(values[index]);
        index = wrapIndex(index + increment, length);
    }
    return result;
}
export { loopSlice };
//# sourceMappingURL=loop-slice.js.map