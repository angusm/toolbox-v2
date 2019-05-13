import { Matrix } from './matrix';
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { renderLoop } from "../../render-loop";
import { forEach } from "../../iterable-iterator/for-each";
import { SetMap } from "../../map/set-map";
var MatrixService = (function () {
    function MatrixService() {
        var _this = this;
        this.positionConstraints_ = new SetMap();
        this.cleanMatrix_ =
            DynamicDefaultMap.usingFunction(function (element) { return Matrix.fromElementTransform(element); });
        this.alteredMatrix_ =
            DynamicDefaultMap.usingFunction(function (element) { return _this.cleanMatrix_.get(element); });
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
        renderLoop.anyMutate(function () {
            var entries = _this.alteredMatrix_.entries();
            forEach(entries, function (_a) {
                var element = _a[0], alteredMatrix = _a[1];
                var constraints = _this.positionConstraints_.get(element).values();
                alteredMatrix
                    .applyPositionConstraintsFromIterableIterator(constraints)
                    .applyToElementTransform(element);
            });
            renderLoop.anyCleanup(function () {
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
export { MatrixService };
//# sourceMappingURL=matrix-service.js.map