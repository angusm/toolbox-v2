import { DynamicDefaultMap } from "../../../map/dynamic-default";
import { renderLoop } from "../../../render-loop";
import { Scroll } from '../../../cached-vectors/scroll';
import { Vector2d } from '../../../math/geometry/vector-2d';
import { getStuckDistance } from "./get-stuck-distance";
import { isFixed } from "../is-fixed";
function getIgnoreStickyOffset_(candidateElement) {
    return getBasicOffset_(candidateElement) - getStuckDistance(candidateElement);
}
function getBasicOffset_(candidateElement) {
    return candidateElement.offsetTop +
        Vector2d.fromElementTransform(candidateElement).y;
}
function getVisibleDistanceFromRoot_(element, getOffsetFn) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (isFixed(candidateElement)) {
            return y + candidateElement.offsetTop;
        }
        else {
            y += getOffsetFn(candidateElement) - candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = Scroll.getSingleton().getPosition().invert();
    return y + invertedScroll.getY();
}
function getVisibleDistanceFromRoot(element, getOffsetFn) {
    if (isFixed(element)) {
        return element.offsetTop;
    }
    return getOffsetFn(element) +
        getVisibleDistanceFromRoot_(element.offsetParent, getOffsetFn);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            DynamicDefaultMap.usingFunction(function (element) {
                return getVisibleDistanceFromRoot(element, getBasicOffset_);
            });
        this.cacheIgnoringSticky_ =
            DynamicDefaultMap.usingFunction(function (element) {
                return getVisibleDistanceFromRoot(element, getIgnoreStickyOffset_);
            });
        this.init_();
    }
    VisibleDistanceFromRootService.prototype.init_ = function () {
        this.renderLoop_();
    };
    VisibleDistanceFromRootService.prototype.getVisibleDistanceFromRoot = function (element) {
        return this.cache_.get(element);
    };
    VisibleDistanceFromRootService.prototype.getVisibleDistanceFromRootIgnoringSticky = function (element) {
        return this.cacheIgnoringSticky_.get(element);
    };
    VisibleDistanceFromRootService.prototype.renderLoop_ = function () {
        var _this = this;
        renderLoop.anyMutate(function () {
            renderLoop.anyCleanup(function () {
                _this.clearCaches_();
                _this.renderLoop_();
            });
        });
    };
    VisibleDistanceFromRootService.prototype.clearCaches_ = function () {
        this.cache_.clear();
        this.cacheIgnoringSticky_.clear();
    };
    VisibleDistanceFromRootService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    VisibleDistanceFromRootService.singleton_ = null;
    return VisibleDistanceFromRootService;
}());
export { VisibleDistanceFromRootService };
//# sourceMappingURL=visible-distance-from-root-service.js.map