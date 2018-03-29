goog.module('toolbox.iterable.mapped_iterable');var module = module || {id: 'toolbox/iterable/mapped-iterable.js'};

var mapped_iterator_1 = goog.require('toolbox.iterable_iterator.mapped_iterator');
var MappedIterable = (function () {
    function MappedIterable(iterable, mapFunction) {
        this.iterable = iterable;
        this.mapFunction = mapFunction;
    }
    MappedIterable.prototype[Symbol.iterator] = function () {
        return new mapped_iterator_1.MappedIterator(this.iterable[Symbol.iterator](), this.mapFunction);
    };
    return MappedIterable;
}());
exports.MappedIterable = MappedIterable;
//# sourceMappingURL=mapped-iterable.js.map