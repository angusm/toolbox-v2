import {Carousel} from './carousel';
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
  private readonly activeCssClass_: string;
  private carousel_: Carousel;
  private navElement_: HTMLElement;
  private navItems_: DynamicDefaultMap<HTMLElement, HTMLElement>;
  private renderCache_: Map<symbol, HTMLElement[]>;

  /**
   * @param carousel Carousel to create the nav for
   * @param navElement HTMLElement to place navigation buttons in
   * @param activeCssClass Class applied to button for the current active slide.
   * @param createNavItemFn Function returning HTML element to use as a button.
   */
  constructor(
    carousel: Carousel,
    navElement: HTMLElement,
    {
      activeCssClass = DefaultClass.ACTIVE_NAV_ITEM,
      createNavItemFn = CarouselNav.createDefaultNavItem,
    }: {
      activeCssClass?: string,
      createNavItemFn?: (slide: HTMLElement, carousel: Carousel) => HTMLElement,
    } = {}
  ) {
    this.activeCssClass_ = activeCssClass;
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
    navItem.classList.remove(this.activeCssClass_);
  }

  public markActiveNavItem(activeSlide: HTMLElement): void {
    this.carousel_.getSlides()
      .forEach(
        (slide) => {
          const navClassList: DOMTokenList =
            this.navItems_.get(slide).classList;
          if (slide === activeSlide) {
            navClassList.add(this.activeCssClass_);
          } else {
            navClassList.remove(this.activeCssClass_);
          }
        });
  }

  public static createDefaultNavItem(
    slide: HTMLElement, carousel: Carousel
  ): HTMLElement   {
    const element = document.createElement('li');
    CarouselNav.addTransitionToSlideListener(element, slide, carousel);
    return element;
  }


  /**
   * @param target The element that when clicked will trigger a transition.
   * Transition is triggered to the given slide.
   *
   * @param slideToTransitionTo The slide that should be transitioned to.
   * Is transitioned to when the given target is interacted with. (clicked)
   *
   * @param carousel The carousel in which all this transitioning happens.
   */
  public static addTransitionToSlideListener(
    target: HTMLElement,
    slideToTransitionTo: HTMLElement,
    carousel: Carousel
  ) {
    target.addEventListener(
      'click', () => carousel.transitionToSlide(slideToTransitionTo));
  }
}

export {CarouselNav};
