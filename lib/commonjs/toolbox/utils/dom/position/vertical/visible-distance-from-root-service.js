"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../../../map/dynamic-default");
var render_loop_1 = require("../../../render-loop");
var scroll_1 = require("../../../cached-vectors/scroll");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
var get_style_1 = require("../../style/get-style");
var get_stuck_distance_1 = require("./get-stuck-distance");
var scroll = scroll_1.Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    vector_2d_1.Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRoot(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        vector_2d_1.Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
function getVisibleDistanceFromRootIgnoringSticky_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    vector_2d_1.Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop -
                    get_stuck_distance_1.getStuckDistance(element);
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
}
function getVisibleDistanceFromRootIgnoringSticky(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        vector_2d_1.Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRootIgnoringSticky_(element.offsetParent);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return getVisibleDistanceFromRoot(element); });
        this.cacheIgnoringSticky_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) {
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
        render_loop_1.renderLoop.anyMutate(function () {
            render_loop_1.renderLoop.anyCleanup(function () {
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
exports.VisibleDistanceFromRootService = VisibleDistanceFromRootService;
//# sourceMappingURL=visible-distance-from-root-service.js.map