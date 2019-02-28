import { areEqual } from '../are-equal';
import { zip } from './zip';
function getLastMatchingIndex() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var zippedValues = zip.apply(void 0, lists);
    var matchIndex;
    for (matchIndex = 0; matchIndex < zippedValues.length; matchIndex++) {
        if (!areEqual.apply(void 0, zippedValues[matchIndex])) {
            return matchIndex - 1;
        }
    }
    return matchIndex - 1;
}
export { getLastMatchingIndex };
//# sourceMappingURL=get-last-matching-index.js.map