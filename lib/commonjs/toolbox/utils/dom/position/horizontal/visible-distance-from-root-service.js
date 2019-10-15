"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../../../map/dynamic-default");
var render_loop_1 = require("../../../render-loop");
var scroll_1 = require("../../../cached-vectors/scroll");
var get_style_1 = require("../../style/get-style");
var vector_2d_1 = require("../../../math/geometry/vector-2d");
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (get_style_1.getStyle(candidateElement, 'position') === 'fixed') {
            return x + candidateElement.offsetLeft;
        }
        var transformVector = vector_2d_1.Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll_1.Scroll.getSingleton().getPosition().invert();
    return x + invertedScroll.x;
}
function getVisibleDistanceFromRoot(element) {
    if (get_style_1.getStyle(element, 'position') === 'fixed') {
        return element.offsetLeft;
    }
    return element.offsetLeft +
        vector_2d_1.Vector2d.fromElementTransform(element).x +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
var VisibleDistanceFromRootService = (function () {
    function VisibleDistanceFromRootService() {
        this.cache_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return getVisibleDistanceFromRoot(element); });
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