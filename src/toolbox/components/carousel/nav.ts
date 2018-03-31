const Carousel = require('./base');
const DynamicDefaultMap = require('../../utils/map/dynamic-default');
const areListValuesEqual = require('../../utils/iterable/are-list-values-equal');
const renderLoop = require('../../utils/render-loop');

const DefaultClass = Object.freeze({
    ACTIVE_NAV_ITEM: 'active',
});

const CacheKey = Object.freeze({
    SLIDES: Symbol('Slides'),
});

class CarouselNav {
    constructor(
        carousel,
        navElement,
        {
            createNavItemFn=CarouselNav.createDefaultNavItem
        } = {}
    ) {
        this.carousel_ = carousel;
        this.navElement_ = navElement;
        this.navItems_ =
            DynamicDefaultMap.usingFunction(
                (slide) => createNavItemFn(slide, carousel));
        this.renderCache_ = new Map();
        this.init_();
    }

    init_() {
        renderLoop.measure(() => this.render_());
    }

    render_() {
        const activeSlide = this.carousel_.getActiveSlide();
        const cachedSlides = this.renderCache_.get(CacheKey.SLIDES);
        const currentSlides = this.carousel_.getSlides();
        renderLoop.mutate(() => {
            if (!areListValuesEqual(cachedSlides, currentSlides)) {
                this.resetNavItems_();
            }
            this.markActiveNavItem(activeSlide);
            this.renderCache_.set(CacheKey.SLIDES, currentSlides);
            renderLoop.measure(() => this.render_());
        });
    }

    resetNavItems_() {
        this.navElement_.innerHTML = '';
        this.carousel_.getSlides().forEach(
            (slide) => this.resetNavItemForSlide_(slide));
    }

    resetNavItemForSlide_(slide) {
        const navItem = this.navItems_.get(slide);
        this.navElement_.appendChild(navItem);
        navItem.classList.remove(DefaultClass.ACTIVE_NAV_ITEM);
    }

    markActiveNavItem(activeSlide) {
        this.carousel_.getSlides().forEach((slide) => {
            const navClassList = this.navItems_.get(slide).classList;
            if (slide === activeSlide) {
                navClassList.add(DefaultClass.ACTIVE_NAV_ITEM);
            } else {
                navClassList.remove(DefaultClass.ACTIVE_NAV_ITEM);
            }
        });
    }

    static createDefaultNavItem(slide, carousel) {
        const element = document.createElement('li');
        element.addEventListener(
            'click', () => carousel.transitionToSlideImmediately(slide));
        return element;
    }
}

module.exports = CarouselNav;
