import { areEqual } from '../are-equal';
import { toBool } from '../to-bool';
import { zip } from './zip';
function areArrayValuesEqual() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    if (!lists.every(function (list) { return toBool(list); })) {
        return false;
    }
    if (!areEqual.apply(void 0, lists.map(function (list) { return list.length; }))) {
        return false;
    }
    return zip.apply(void 0, lists).every(function (zippedValues) { return areEqual.apply(void 0, zippedValues); });
}
export { areArrayValuesEqual };
//# sourceMappingURL=are-array-values-equal.js.map