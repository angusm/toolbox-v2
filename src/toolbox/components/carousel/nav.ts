import {Carousel} from './base';
import {DynamicDefaultMap} from '../../utils/map/dynamic-default';
import {areArrayValuesEqual} from '../../utils/array/are-array-values-equal';
import {renderLoop} from '../../utils/render-loop';

class DefaultClass {
  public static ACTIVE_NAV_ITEM = 'active';
}

class CacheKey {
  public static SLIDES = Symbol('Slides');
}

class CarouselNav {
  private carousel_: Carousel;
  private navElement_: HTMLElement;
  private navItems_: DynamicDefaultMap<HTMLElement, HTMLElement>;
  private renderCache_: Map<symbol, HTMLElement[]>;

  constructor(
    carousel: Carousel,
    navElement: HTMLElement,
    {
      createNavItemFn = CarouselNav.createDefaultNavItem
    }: {
      createNavItemFn?: (slide: HTMLElement, carousel: Carousel) => HTMLElement,
    } = {}
  ) {
    this.carousel_ = carousel;
    this.navElement_ = navElement;
    this.navItems_ =
      DynamicDefaultMap.usingFunction<HTMLElement, HTMLElement>(
        (slide) => createNavItemFn(slide, carousel));
    this.renderCache_ = new Map<symbol, HTMLElement[]>();
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => this.render_());
  }

  private render_(): void {
    const activeSlide: HTMLElement = this.carousel_.getActiveSlide();
    const cachedSlides: HTMLElement[] = this.renderCache_.get(CacheKey.SLIDES);
    const currentSlides: HTMLElement[] = this.carousel_.getSlides();
    renderLoop.mutate(() => {
      if (!areArrayValuesEqual(cachedSlides, currentSlides)) {
        this.resetNavItems_();
      }
      this.markActiveNavItem(activeSlide);
      this.renderCache_.set(CacheKey.SLIDES, currentSlides);
      renderLoop.measure(() => this.render_());
    });
  }

  private resetNavItems_(): void {
    this.navElement_.innerHTML = '';
    this.carousel_.getSlides().forEach(
      (slide) => this.resetNavItemForSlide_(slide));
  }

  private resetNavItemForSlide_(slide: HTMLElement): void {
    const navItem: HTMLElement = this.navItems_.get(slide);
    this.navElement_.appendChild(navItem);
    navItem.classList.remove(DefaultClass.ACTIVE_NAV_ITEM);
  }

  public markActiveNavItem(activeSlide: HTMLElement): void {
    this.carousel_.getSlides()
      .forEach(
        (slide) => {
          const navClassList: DOMTokenList =
            this.navItems_.get(slide).classList;
          if (slide === activeSlide) {
            navClassList.add(DefaultClass.ACTIVE_NAV_ITEM);
          } else {
            navClassList.remove(DefaultClass.ACTIVE_NAV_ITEM);
          }
        });
  }

  public static createDefaultNavItem(
    slide: HTMLElement, carousel: Carousel
  ): HTMLElement   {
    const element = document.createElement('li');
    element.addEventListener(
      'click', () => carousel.transitionToSlideImmediately(slide));
    return element;
  }
}

export {CarouselNav};
