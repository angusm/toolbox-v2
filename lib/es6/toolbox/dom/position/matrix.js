var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = parseFloat(a);
        this.b = parseFloat(b);
        this.c = parseFloat(c);
        this.d = parseFloat(d);
        this.tx = parseFloat(tx);
        this.ty = parseFloat(ty);
    }
    Object.defineProperty(Matrix.prototype, "translateX", {
        get: function () {
            return this.tx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "translateY", {
        get: function () {
            return this.ty;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.translate = function (vector) {
        var newX = this.tx + vector.x;
        var newY = this.ty + vector.y;
        return new Matrix(this.a, this.b, this.c, this.d, newX, newY);
    };
    Matrix.prototype.setTranslateX = function (value) {
        return new Matrix(this.a, this.b, this.c, this.d, value, this.ty);
    };
    Matrix.prototype.setTranslateY = function (value) {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, value);
    };
    Matrix.parseFromString = function (str) {
        var valuesStr = str.split('matrix(').splice(-1)[0].split(')')[0];
        var values = valuesStr.split(',').map(function (str) { return str.trim(); });
        if (!values.length || values[0] === 'none') {
            return new Matrix();
        }
        else {
            return new (Matrix.bind.apply(Matrix, [void 0].concat(values)))();
        }
    };
    Matrix.fromElementTransform = function (element) {
        return Matrix.parseFromString(window.getComputedStyle(element).transform);
    };
    Matrix.prototype.toCSSString = function () {
        var values = [this.a, this.b, this.c, this.d, this.tx, this.ty];
        return "matrix(" + values.join(',') + ")";
    };
    Matrix.prototype.applyToElementTransform = function (element) {
        element.style.transform = this.toCSSString();
    };
    return Matrix;
}());
export { Matrix };
//# sourceMappingURL=matrix.js.map