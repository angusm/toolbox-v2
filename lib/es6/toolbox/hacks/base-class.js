var BaseClass = (function () {
    function BaseClass() {
    }
    Object.defineProperty(BaseClass.prototype, Symbol.species, {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return BaseClass;
}());
export { BaseClass };
//# sourceMappingURL=base-class.js.map