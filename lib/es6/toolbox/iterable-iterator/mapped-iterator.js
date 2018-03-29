var MappedIterator = (function () {
    function MappedIterator(iterator, mapFunction) {
        this.iterator = iterator;
        this.mapFunction = mapFunction;
    }
    MappedIterator.prototype.next = function () {
        var nextValue = this.iterator.next();
        return {
            done: nextValue.done,
            value: this.mapFunction(nextValue.value)
        };
    };
    MappedIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return MappedIterator;
}());
export { MappedIterator };
//# sourceMappingURL=mapped-iterator.js.map