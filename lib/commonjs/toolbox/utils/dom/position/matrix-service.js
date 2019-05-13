"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var dynamic_default_1 = require("../../map/dynamic-default");
var render_loop_1 = require("../../render-loop");
var for_each_1 = require("../../iterable-iterator/for-each");
var set_map_1 = require("../../map/set-map");
var MatrixService = (function () {
    function MatrixService() {
        var _this = this;
        this.positionConstraints_ = new set_map_1.SetMap();
        this.cleanMatrix_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return matrix_1.Matrix.fromElementTransform(element); });
        this.alteredMatrix_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return _this.cleanMatrix_.get(element); });
        this.init_();
    }
    MatrixService.prototype.init_ = function () {
        this.renderLoop_();
    };
    MatrixService.prototype.getCleanMatrix = function (element) {
        return this.cleanMatrix_.get(element);
    };
    MatrixService.prototype.getAlteredMatrix = function (element) {
        return this.alteredMatrix_.get(element);
    };
    MatrixService.prototype.getAlteredXTranslation = function (element) {
        return this.getAlteredMatrix(element).getTranslateX() -
            this.getCleanMatrix(element).getTranslateX();
    };
    MatrixService.prototype.getAlteredYTranslation = function (element) {
        return this.getAlteredMatrix(element).getTranslateY() -
            this.getCleanMatrix(element).getTranslateY();
    };
    MatrixService.prototype.addPositionConstraint = function (element, constraint) {
        this.positionConstraints_.get(element).add(constraint);
    };
    MatrixService.prototype.removePositionConstraint = function (element, constraint) {
        this.positionConstraints_.get(element).delete(constraint);
    };
    MatrixService.prototype.translate = function (element, vector) {
        this.alteredMatrix_.set(element, this.alteredMatrix_.get(element).translate(vector));
    };
    MatrixService.prototype.renderLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.anyMutate(function () {
            var entries = _this.alteredMatrix_.entries();
            for_each_1.forEach(entries, function (_a) {
                var element = _a[0], alteredMatrix = _a[1];
                var constraints = _this.positionConstraints_.get(element).values();
                alteredMatrix
                    .applyPositionConstraintsFromIterableIterator(constraints)
                    .applyToElementTransform(element);
            });
            render_loop_1.renderLoop.anyCleanup(function () {
                _this.cleanMatrix_.clear();
                _this.alteredMatrix_.clear();
                _this.renderLoop_();
            });
        });
    };
    MatrixService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    MatrixService.singleton_ = null;
    return MatrixService;
}());
exports.MatrixService = MatrixService;
//# sourceMappingURL=matrix-service.js.map