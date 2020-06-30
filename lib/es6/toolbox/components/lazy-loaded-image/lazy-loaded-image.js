var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { addClassIfMissing } from '../../utils/dom/class/add-class-if-missing';
import { renderLoop } from '../../utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../utils/dom/position/vertical/get-visible-distance-from-root';
import { loadImage } from '../../utils/loading/load-image';
var defaultOptions = {
    getLoadedCssClass: null,
    getLoadDistance: function () { return window.innerHeight; },
    callbacks: []
};
var LazyLoadedImage = (function () {
    function LazyLoadedImage(imageElement, imageUrl, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getLoadedCssClass, getLoadedCssClass = _c === void 0 ? defaultOptions.getLoadedCssClass : _c, _d = _b.getLoadDistance, getLoadDistance = _d === void 0 ? defaultOptions.getLoadDistance : _d, _e = _b.callbacks, callbacks = _e === void 0 ? defaultOptions.callbacks : _e;
        this.element_ = imageElement;
        this.url_ = imageUrl;
        this.callbacks_ =
            getLoadedCssClass === null
                ? callbacks
                : __spreadArrays(callbacks, [
                    function (element, url) {
                        addClassIfMissing(element, getLoadedCssClass(element, url));
                    }
                ]);
        this.getLoadDistance_ = getLoadDistance;
    }
    LazyLoadedImage.prototype.init = function () {
        this.renderLoop_();
    };
    LazyLoadedImage.fireAndForget = function (element, url, options) {
        if (options === void 0) { options = defaultOptions; }
        var lazyLoadedImage = new this(element, url, options);
        lazyLoadedImage.init();
        return lazyLoadedImage;
    };
    LazyLoadedImage.prototype.renderLoop_ = function () {
        var _this = this;
        renderLoop.scrollMeasure(function () {
            var loadDistance = _this.getLoadDistance_(_this.element_, _this.url_);
            var distanceFromRoot = getVisibleDistanceFromRoot(_this.element_);
            if (distanceFromRoot < loadDistance) {
                loadImage(_this.url_).then(function () {
                    _this.element_.src = _this.url_;
                    _this.callbacks_.forEach(function (callback) {
                        callback(_this.element_, _this.url_);
                    });
                });
            }
            else {
                renderLoop.scrollCleanup(function () {
                    _this.renderLoop_();
                });
            }
        });
    };
    return LazyLoadedImage;
}());
export { LazyLoadedImage };
//# sourceMappingURL=lazy-loaded-image.js.map