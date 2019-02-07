import { areIteratorsEqual } from '../iterator/are-iterators-equal';
function areIterablesEqual() {
    var iterables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterables[_i] = arguments[_i];
    }
    return areIteratorsEqual.apply(void 0, iterables.map(function (iterable) { return iterable[Symbol.iterator](); }));
}
export { areIterablesEqual };
//# sourceMappingURL=are-iterables-equal.js.map