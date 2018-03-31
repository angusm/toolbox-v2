goog.module('toolbox.iterable_iterator.mapped_iterator');var module = module || {id: 'toolbox/iterable-iterator/mapped-iterator.js'};

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
exports.MappedIterator = MappedIterator;
//# sourceMappingURL=mapped-iterator.js.map