import { areEqual } from '../are-equal';
function areIteratorsEqual() {
    var iterators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterators[_i] = arguments[_i];
    }
    var done = false;
    while (!done) {
        var results = iterators.map(function (iterator) { return iterator.next(); });
        var doneResults = results.map(function (result) { return result.done; });
        if (!areEqual.apply(void 0, doneResults)) {
            return false;
        }
        var values = results.map(function (result) { return result.value; });
        if (!areEqual.apply(void 0, values)) {
            return false;
        }
    }
    return true;
}
export { areIteratorsEqual };
//# sourceMappingURL=are-iterators-equal.js.map