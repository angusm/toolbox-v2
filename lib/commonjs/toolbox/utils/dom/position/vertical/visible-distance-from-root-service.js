"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../../../map/dynamic-default");
var render_loop_1 = require("../../../render-loop");
var scroll_1 = require("../../../cached-vectors/scroll");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
var get_stuck_distance_1 = require("./get-stuck-distance");
var is_fixed_1 = require("../is-fixed");
var scroll = scroll_1.Scroll.getSingleton();
function getIgnoreStickyOffset_(candidateElement) {
    return getBasicOffset_(candidateElement) - get_stuck_distance_1.getStuckDistance(candidateElement);
}
function getBasicOffset_(candidateElement) {
    return candidateElement.offsetTop +
        vector_2d_1.Vector2d.fromElementTransform(candidateElement).y;
}
function getVisibleDistanceFromRoot_(element, getOffsetFn) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (is_fixed_1.isFixed(candidateElement)) {
            return y + candidateElement.offsetTop;
        }
        else {
            y += getOffsetFn(candidateElement) -
                candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRoot(element, getOffsetFn) {
    if (is_fixed_1.isFixed(element)) {
        return element.offsetTop;
    }
    return getOffsetFn(element) +
        getVisibleDistanceFromRoot_(element.offsetParent, getOffsetFn);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) {
                return getVisibleDistanceFromRoot(element, getBasicOffset_);
            });
        this.cacheIgnoringSticky_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) {
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
        render_loop_1.renderLoop.anyMutate(function () {
            render_loop_1.renderLoop.anyCleanup(function () {
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
exports.VisibleDistanceFromRootService = VisibleDistanceFromRootService;
//# sourceMappingURL=visible-distance-from-root-service.js.map