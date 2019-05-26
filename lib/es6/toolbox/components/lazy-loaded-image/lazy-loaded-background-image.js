import { addClassIfMissing } from '../../utils/dom/class/add-class-if-missing';
import { renderLoop } from '../../utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../utils/dom/position/vertical/get-visible-distance-from-root';
import { loadImage } from '../../utils/loading/load-image';
import { setStyle } from '../../utils/dom/style/set-style';
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
                : callbacks.concat([
                    function (element, url) {
                        addClassIfMissing(element, getLoadedCssClass(element, url));
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
        renderLoop.scrollMeasure(function () {
            var loadDistance = _this.getLoadDistance_(_this.element_, _this.url_);
            var distanceFromRoot = getVisibleDistanceFromRoot(_this.element_);
            if (distanceFromRoot < loadDistance) {
                loadImage(_this.url_).then(function () {
                    setStyle(_this.element_, 'background-image', "url(" + _this.url_ + ")");
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
    return LazyLoadedBackgroundImage;
}());
export { LazyLoadedBackgroundImage };
//# sourceMappingURL=lazy-loaded-background-image.js.map