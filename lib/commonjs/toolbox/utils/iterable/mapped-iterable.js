"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedIterable = void 0;
var mapped_iterator_1 = require("../iterable-iterator/mapped-iterator");
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