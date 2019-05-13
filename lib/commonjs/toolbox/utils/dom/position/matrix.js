"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
var render_loop_1 = require("../../render-loop");
var array_1 = require("../../map/array");
var computed_style_service_1 = require("../style/computed-style-service");
var reduce_1 = require("../../iterable-iterator/reduce");
var matrixChangesByElement_ = new array_1.ArrayMap();
var preChangeMatrixByElement_ = new Map();
var STYLE_STRING_PREFIX = 'matrix(';
var STYLE_STRING_PREFIX_LENGTH = STYLE_STRING_PREFIX.length;
var computedStyleService = computed_style_service_1.ComputedStyleService.getSingleton();
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
    Matrix.prototype.getTranslateX = function () {
        return this.tx;
    };
    Matrix.prototype.getTranslateY = function () {
        return this.ty;
    };
    Matrix.prototype.translate = function (vector) {
        var newX = this.tx + vector.x;
        var newY = this.ty + vector.y;
        return new Matrix(this.a, this.b, this.c, this.d, newX, newY);
    };
    Matrix.prototype.setPosition = function (position) {
        return new Matrix(this.a, this.b, this.c, this.d, position.x, position.y);
    };
    Matrix.prototype.setTranslateX = function (value) {
        return new Matrix(this.a, this.b, this.c, this.d, value, this.ty);
    };
    Matrix.prototype.setTranslateY = function (value) {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, value);
    };
    Matrix.prototype.applyPositionConstraint = function (constraint) {
        var position = constraint.constrain(new vector_2d_1.Vector2d(this.tx, this.ty));
        return this.setPosition(position);
    };
    Matrix.prototype.applyPositionConstraints = function (constraints) {
        var position = constraints.reduce(function (position, constraint) {
            return constraint.constrain(position);
        }, new vector_2d_1.Vector2d(this.tx, this.ty));
        return this.setPosition(position);
    };
    Matrix.prototype.applyPositionConstraintsFromIterableIterator = function (constraints) {
        var position = reduce_1.reduce(constraints, function (position, constraint) {
            return constraint.constrain(position);
        }, new vector_2d_1.Vector2d(this.tx, this.ty));
        return this.setPosition(position);
    };
    Matrix.prototype.set2dTranslation = function (translation) {
        return new Matrix(this.a, this.b, this.c, this.d, translation.x, translation.y);
    };
    Matrix.prototype.setScale = function (scale) {
        return new Matrix(scale, this.b, this.c, scale, this.tx, this.ty);
    };
    Matrix.parseFromString = function (str) {
        if (str === 'none' || !str.length) {
            return new Matrix();
        }
        return new (Matrix.bind.apply(Matrix, [void 0].concat(str.slice(STYLE_STRING_PREFIX_LENGTH, -1).split(','))))();
    };
    Matrix.fromElementTransform = function (element) {
        return Matrix.parseFromString(computedStyleService.getComputedStyle(element).transform);
    };
    Matrix.prototype.toCSSString = function () {
        var values = [this.a, this.b, this.c, this.d, this.tx, this.ty];
        return "matrix(" + values.join(',') + ")";
    };
    Matrix.prototype.applyToElementTransform = function (element) {
        element.style.transform = this.toCSSString();
    };
    Matrix.prototype.applyToElementTransformAsChange = function (element, originalMatrix) {
        matrixChangesByElement_.get(element)
            .push(this.getDifference(originalMatrix));
        preChangeMatrixByElement_.set(element, originalMatrix);
        Matrix.mutateElementWithMatrixChanges(element);
    };
    Matrix.mutateElementWithMatrixChanges = function (element) {
        render_loop_1.renderLoop.mutate(function () {
            var originalMatrix = preChangeMatrixByElement_.get(element);
            var changes = matrixChangesByElement_.get(element);
            if (changes.length < 1) {
                return;
            }
            matrixChangesByElement_.delete(element);
            var finalMatrix = changes.reduce(function (accumulationMatrix, changeMatrix) {
                return accumulationMatrix.applyDifference(changeMatrix);
            }, originalMatrix);
            finalMatrix.applyToElementTransform(element);
            render_loop_1.renderLoop.cleanup(function () {
                preChangeMatrixByElement_.clear();
                matrixChangesByElement_.clear();
            });
        });
    };
    Matrix.prototype.applyDifference = function (differenceMatrix) {
        return new Matrix(this.a + differenceMatrix.a, this.b + differenceMatrix.b, this.c + differenceMatrix.c, this.d + differenceMatrix.d, this.tx + differenceMatrix.tx, this.ty + differenceMatrix.ty);
    };
    Matrix.prototype.getDifference = function (matrix) {
        return new Matrix(this.a - matrix.a, this.b - matrix.b, this.c - matrix.c, this.d - matrix.d, this.tx - matrix.tx, this.ty - matrix.ty);
    };
    return Matrix;
}());
exports.Matrix = Matrix;
//# sourceMappingURL=matrix.js.map