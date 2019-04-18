import { DynamicDefaultMap } from "../../../map/dynamic-default";
import { renderLoop } from "../../../render-loop";
import { Scroll } from '../../../cached-vectors/scroll';
import { getStyle } from '../../style/get-style';
import { Vector2d } from "../../../math/geometry/vector-2d";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return x + candidateElement.offsetLeft;
        }
        var transformVector = Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return x + invertedScroll.x;
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetLeft;
    }
    return element.offsetLeft +
        Vector2d.fromElementTransform(element).x +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            DynamicDefaultMap.usingFunction(function (element) { return getVisibleDistanceFromRoot(element); });
        this.init_();
    }
    VisibleDistanceFromRootService.prototype.init_ = function () {
        this.renderLoop_();
    };
    VisibleDistanceFromRootService.prototype.getVisibleDistanceFromRoot = function (element) {
        return this.cache_.get(element);
    };
    VisibleDistanceFromRootService.prototype.renderLoop_ = function () {
        var _this = this;
        renderLoop.anyMutate(function () {
            renderLoop.anyCleanup(function () {
                _this.cache_.clear();
                _this.renderLoop_();
            });
        });
    };
    VisibleDistanceFromRootService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    VisibleDistanceFromRootService.singleton_ = null;
    return VisibleDistanceFromRootService;
}());
export { VisibleDistanceFromRootService };
//# sourceMappingURL=visible-distance-from-root-service.js.map