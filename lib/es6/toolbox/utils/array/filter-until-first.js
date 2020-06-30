var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { filterUntilTrue } from './filter-until-true';
function filterUntilFirst(values, conditionFn) {
    var results = filterUntilTrue(values, conditionFn);
    if (results.length < values.length) {
        return __spreadArrays(results, [values[results.length]]);
    }
    else {
        return results;
    }
}
export { filterUntilFirst };
//# sourceMappingURL=filter-until-first.js.map