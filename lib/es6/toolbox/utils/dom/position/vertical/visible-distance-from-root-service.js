import { DynamicDefaultMap } from "../../../map/dynamic-default";
import { renderLoop } from "../../../render-loop";
import { Scroll } from '../../../cached-vectors/scroll';
import { Vector2d } from '../../../math/geometry/vector-2d';
import { getStyle } from "../../style/get-style";
import { getStuckDistance } from "./get-stuck-distance";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
function getVisibleDistanceFromRootIgnoringSticky_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop -
                    getStuckDistance(element);
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRootIgnoringSticky(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRootIgnoringSticky_(element.offsetParent);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            DynamicDefaultMap.usingFunction(function (element) { return getVisibleDistanceFromRoot(element); });
        this.cacheIgnoringSticky_ =
            DynamicDefaultMap.usingFunction(function (element) {
                return getVisibleDistanceFromRootIgnoringSticky(element);
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