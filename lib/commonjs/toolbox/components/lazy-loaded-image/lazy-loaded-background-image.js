"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyLoadedBackgroundImage = void 0;
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var render_loop_1 = require("../../utils/render-loop");
var get_visible_distance_from_root_1 = require("../../utils/dom/position/vertical/get-visible-distance-from-root");
var load_image_1 = require("../../utils/loading/load-image");
var set_style_1 = require("../../utils/dom/style/set-style");
var defaultOptions = {
    getLoadedCssClass: null,
    getLoadDistance: function () { return window.innerHeight; },
    callbacks: []
};
var LazyLoadedBackgroundImage = (function () {
    function LazyLoadedBackgroundImage(imageElement, imageUrl, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getLoadedCssClass, getLoadedCssClass = _c === void 0 ? defaultOptions.getLoadedCssClass : _c, _d = _b.getLoadDistance, getLoadDistance = _d === void 0 ? defaultOptions.getLoadDistance : _d, _e = _b.callbacks, callbacks = _e === void 0 ? defaultOptions.callbacks : _e;
        this.element_ = imageElement;
        this.url_ = imageUrl;
        this.callbacks_ =
            getLoadedCssClass === null
                ? callbacks
                : __spreadArrays(callbacks, [
                    function (element, url) {
                        add_class_if_missing_1.addClassIfMissing(element, getLoadedCssClass(element, url));
                    }
                ]);
        this.getLoadDistance_ = getLoadDistance;
    }
    LazyLoadedBackgroundImage.prototype.init = function () {
        this.renderLoop_();
    };
    LazyLoadedBackgroundImage.fireAndForget = function (element, url, options) {
        if (options === void 0) { options = defaultOptions; }
        var lazyLoadedImage = new this(element, url, options);
        lazyLoadedImage.init();
        return lazyLoadedImage;
    };
    LazyLoadedBackgroundImage.prototype.renderLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollMeasure(function () {
            var loadDistance = _this.getLoadDistance_(_this.element_, _this.url_);
            var distanceFromRoot = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(_this.element_);
            if (distanceFromRoot < loadDistance) {
                load_image_1.loadImage(_this.url_).then(function () {
                    set_style_1.setStyle(_this.element_, 'background-image', "url(" + _this.url_ + ")");
                    _this.callbacks_.forEach(function (callback) {
                        callback(_this.element_, _this.url_);
                    });
                });
            }
            else {
                render_loop_1.renderLoop.scrollCleanup(function () {
                    _this.renderLoop_();
                });
            }
        });
    };
    return LazyLoadedBackgroundImage;
}());
exports.LazyLoadedBackgroundImage = LazyLoadedBackgroundImage;
//# sourceMappingURL=lazy-loaded-background-image.js.map