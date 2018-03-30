import { filterUntilTrue } from './filter-until-true';
function filterUntilFirst(values, conditionFn) {
    var results = filterUntilTrue(values, conditionFn);
    if (results.length < values.length) {
        return results.concat([values[results.length]]);
    }
    else {
        return results;
    }
}
export { filterUntilFirst };
//# sourceMappingURL=filter-until-first.js.map