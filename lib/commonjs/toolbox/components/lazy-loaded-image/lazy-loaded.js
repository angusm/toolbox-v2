"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var render_loop_1 = require("../../utils/render-loop");
var get_visible_distance_from_root_1 = require("../../utils/dom/position/vertical/get-visible-distance-from-root");
var defaultOptions = {
    getLoadedCssClass: null,
    getLoadDistance: function () { return window.innerHeight; },
    callbacks: []
};
var LazyLoaded = (function () {
    function LazyLoaded(imageElement, imageUrl, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getLoadedCssClass, getLoadedCssClass = _c === void 0 ? defaultOptions.getLoadedCssClass : _c, _d = _b.getLoadDistance, getLoadDistance = _d === void 0 ? defaultOptions.getLoadDistance : _d, _e = _b.callbacks, callbacks = _e === void 0 ? defaultOptions.callbacks : _e;
        this.element_ = imageElement;
        this.url_ = imageUrl;
        this.callbacks_ =
            getLoadedCssClass === null
                ? callbacks
                : callbacks.concat([
                    function (element, url) {
                        add_class_if_missing_1.addClassIfMissing(element, getLoadedCssClass(element, url));
                    }
                ]);
        this.getLoadDistance_ = getLoadDistance;
    }
    LazyLoaded.prototype.init = function () {
        this.renderLoop_();
    };
    LazyLoaded.fireAndForget = function (element, url, options) {
        if (options === void 0) { options = defaultOptions; }
        var lazyLoadedImage = new this(element, url, options);
        lazyLoadedImage.init();
        return lazyLoadedImage;
    };
    LazyLoaded.prototype.loadImage = function (url, element, callbacks) {
        return;
    };
    LazyLoaded.prototype.renderLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollMeasure(function () {
            var loadDistance = _this.getLoadDistance_(_this.element_, _this.url_);
            var distanceFromRoot = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(_this.element_);
            if (distanceFromRoot < loadDistance) {
                _this.loadImage(_this.url_, _this.element_, _this.callbacks_);
            }
            else {
                render_loop_1.renderLoop.scrollCleanup(function () {
                    _this.renderLoop_();
                });
            }
        });
    };
    return LazyLoaded;
}());
exports.LazyLoaded = LazyLoaded;
//# sourceMappingURL=lazy-loaded.js.map