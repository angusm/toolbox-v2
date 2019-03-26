"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var are_array_values_equal_1 = require("../../utils/array/are-array-values-equal");
var render_loop_1 = require("../../utils/render-loop");
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
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (slide) { return createNavItemFn(slide, carousel); });
        this.renderCache_ = new Map();
        this.init_();
    }
    CarouselNav.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.render_(); });
    };
    CarouselNav.prototype.render_ = function () {
        var _this = this;
        var activeSlide = this.carousel_.getActiveSlide();
        var cachedSlides = this.renderCache_.get(CacheKey.SLIDES);
        var currentSlides = this.carousel_.getSlides();
        render_loop_1.renderLoop.mutate(function () {
            if (!are_array_values_equal_1.areArrayValuesEqual(cachedSlides, currentSlides)) {
                _this.resetNavItems_();
            }
            _this.markActiveNavItem(activeSlide);
            _this.renderCache_.set(CacheKey.SLIDES, currentSlides);
            render_loop_1.renderLoop.measure(function () { return _this.render_(); });
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
        CarouselNav.addTransitionToSlideListener(element, slide, carousel);
        return element;
    };
    CarouselNav.addTransitionToSlideListener = function (target, slideToTransitionTo, carousel) {
        target.addEventListener('click', function () { return carousel.transitionToSlide(slideToTransitionTo); });
    };
    return CarouselNav;
}());
exports.CarouselNav = CarouselNav;
//# sourceMappingURL=nav.js.map