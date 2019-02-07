var CssNumber = (function () {
    function CssNumber(value) {
        this.value_ = value;
    }
    CssNumber.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new CssNumber(values[0]);
    };
    CssNumber.fromStyleString = function (styleString) {
        return new CssNumber(parseFloat(styleString));
    };
    CssNumber.prototype.toNumbers = function () {
        return [this.value_];
    };
    CssNumber.prototype.toStyleString = function () {
        return "" + this.value_;
    };
    return CssNumber;
}());
export { CssNumber };
//# sourceMappingURL=css-number.js.map