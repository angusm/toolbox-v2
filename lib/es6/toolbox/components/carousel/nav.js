import { DynamicDefaultMap } from '../../utils/map/dynamic-default';
import { areArrayValuesEqual } from '../../utils/array/are-array-values-equal';
import { renderLoop } from '../../utils/render-loop';
import { addDomEventListener } from "../../utils/dom/event/add-dom-event-listener";
import { EventType } from "../../utils/dom/event/event-type";
var DefaultClass = (function () {
    function DefaultClass() {
    }
    DefaultClass.ACTIVE_NAV_ITEM = 'active';
    return DefaultClass;
}());
var CacheKey = (function () {
    function CacheKey() {
    }
    CacheKey.SLIDES = Symbol('Slides');
    return CacheKey;
}());
var CarouselNav = (function () {
    function CarouselNav(carousel, navElement, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.activeCssClass, activeCssClass = _c === void 0 ? DefaultClass.ACTIVE_NAV_ITEM : _c, _d = _b.createNavItemFn, createNavItemFn = _d === void 0 ? CarouselNav.createDefaultNavItem : _d;
        this.activeCssClass_ = activeCssClass;
        this.carousel_ = carousel;
        this.navElement_ = navElement;
        this.navItems_ =
            DynamicDefaultMap.usingFunction(function (slide) { return createNavItemFn(slide, carousel); });
        this.renderCache_ = new Map();
        this.init_();
    }
    CarouselNav.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () { return _this.render_(); });
    };
    CarouselNav.prototype.render_ = function () {
        var _this = this;
        var activeSlide = this.carousel_.getActiveSlide();
        var cachedSlides = this.renderCache_.get(CacheKey.SLIDES);
        var currentSlides = this.carousel_.getSlides();
        renderLoop.mutate(function () {
            if (!areArrayValuesEqual(cachedSlides, currentSlides)) {
                _this.resetNavItems_();
            }
            _this.markActiveNavItem(activeSlide);
            _this.renderCache_.set(CacheKey.SLIDES, currentSlides);
            renderLoop.measure(function () { return _this.render_(); });
        });
    };
    CarouselNav.prototype.resetNavItems_ = function () {
        var _this = this;
        this.navElement_.innerHTML = '';
        this.carousel_.getSlides().forEach(function (slide) { return _this.resetNavItemForSlide_(slide); });
    };
    CarouselNav.prototype.resetNavItemForSlide_ = function (slide) {
        var navItem = this.navItems_.get(slide);
        this.navElement_.appendChild(navItem);
        navItem.classList.remove(this.activeCssClass_);
    };
    CarouselNav.prototype.markActiveNavItem = function (activeSlide) {
        var _this = this;
        this.carousel_.getSlides()
            .forEach(function (slide) {
            var navClassList = _this.navItems_.get(slide).classList;
            if (slide === activeSlide) {
                navClassList.add(_this.activeCssClass_);
            }
            else {
                navClassList.remove(_this.activeCssClass_);
            }
        });
    };
    CarouselNav.createDefaultNavItem = function (slide, carousel) {
        var element = document.createElement('li');
        addDomEventListener(element, EventType.CLICK, function () { return carousel.transitionToSlide(slide); });
        return element;
    };
    return CarouselNav;
}());
export { CarouselNav };
//# sourceMappingURL=nav.js.map