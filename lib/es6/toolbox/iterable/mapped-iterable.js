import { MappedIterator } from '../iterator/mapped-iterator';
var MappedIterable = (function () {
    function MappedIterable(iterable, mapFunction) {
        this.iterable = iterable;
        this.mapFunction = mapFunction;
    }
    MappedIterable.prototype[Symbol.iterator] = function () {
        return new MappedIterator(this.iterable[Symbol.iterator](), this.mapFunction);
    };
    return MappedIterable;
}());
export { MappedIterable };
//# sourceMappingURL=mapped-iterable.js.map