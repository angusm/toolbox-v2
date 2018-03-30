import { filterUntilFalse } from './filter-until-false';
function filterUntilTrue(values, conditionFn) {
    return filterUntilFalse(values, function (v, i) { return !conditionFn(v, i); });
}
export { filterUntilTrue };
//# sourceMappingURL=filter-until-true.js.map