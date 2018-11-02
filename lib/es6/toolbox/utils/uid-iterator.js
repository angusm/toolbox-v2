var UidIterator = (function () {
    function UidIterator() {
        this.counter_ = 0;
    }
    UidIterator.prototype.next = function (value) {
        this.counter_++;
        return {
            value: this.counter_,
            done: this.counter_ >= Number.POSITIVE_INFINITY,
        };
    };
    UidIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return UidIterator;
}());
export { UidIterator };
//# sourceMappingURL=uid-iterator.js.map