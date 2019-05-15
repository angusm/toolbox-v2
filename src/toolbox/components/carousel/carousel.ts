import {ICarousel, ITransition} from './interfaces';
import {isVisible} from '../../utils/dom/position/is-visible';
import {removeFirstInstance} from '../../utils/array/remove-first-instance';
import {renderLoop} from '../../utils/render-loop';
import {toBool} from "../../utils/to-bool";
import {CarouselSyncManager} from './sync-manager';
import {NumericRange} from "../../utils/math/numeric-range";
import {CssClassesOnly} from "./transitions/css-classes-only";
import {splitEvenlyOnItem} from "../../utils/array/split-evenly-on-item";
import {DynamicDefaultMap} from "../../utils/map/dynamic-default";
import {subtract} from "../../utils/set/subtract";
import {removeClassesIfPresent} from "../../utils/dom/class/remove-classes-if-present";
import {addClassesIfMissing} from "../../utils/dom/class/add-classes-if-missing";

const defaultTransition: ITransition = new CssClassesOnly();
const INTERACTION: symbol = Symbol('interaction');
const CssClass = Object.freeze({
  ACTIVE_SLIDE: 'active',
  BEFORE_SLIDE: 'before',
  AFTER_SLIDE: 'after',
});

class Carousel implements ICarousel {
  private readonly activeCssClass_: string;
  private readonly activeCssClassSet_: Set<string>;
  private readonly beforeCssClass_: string;
  private readonly beforeCssClassMap_: DynamicDefaultMap<number, Set<string>>;
  private readonly afterCssClass_: string;
  private readonly afterCssClassMap_: DynamicDefaultMap<number, Set<string>>;
  private readonly container_: HTMLElement;
  private readonly slides_: HTMLElement[];
  private readonly transition_: ITransition;
  private readonly allowLooping_: boolean;
  private readonly onTransitionCallbacks_: ((carousel: ICarousel) => void)[];
  private readonly slideCssClasses_:
    DynamicDefaultMap<HTMLElement, Set<string>>;
  private transitionTarget_: HTMLElement;
  private interactions_: symbol[];
  private lastActiveSlide_: HTMLElement;
  private destroyed_: boolean;

  /**
   * @param container Parent element of slides.
   * Element that acts as the carousel, in which all slides are contained.
   * Does not need to be the direct parent.
   *
   * @param slides HTMLElements containing slide content.
   *
   * @param onTransitionCallbacks Functions run when the active slide changes.
   * @param activeCssClass Class to apply to active slide.
   * @param beforeCssClass Class to apply to slides before active slide.
   * @param afterCssClass Class to apply to slides after active slide.
   * @param allowLooping Whether the carousel should be allowed to loop.
   * @param transition How the Carousel should transition.
   * Please see the transitions folder inside the carousel folder for options.
   */
  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      onTransitionCallbacks = [],
      activeCssClass = CssClass.ACTIVE_SLIDE,
      beforeCssClass = CssClass.BEFORE_SLIDE,
      afterCssClass = CssClass.AFTER_SLIDE,
      allowLooping = true,
      transition = defaultTransition,
    }: {
      onTransitionCallbacks?: ((carousel: ICarousel) => void)[],
      activeCssClass?: string,
      beforeCssClass?: string,
      afterCssClass?: string,
      allowLooping?: boolean,
      transition?: ITransition,
    } = {}
  ) {
    this.activeCssClass_ = activeCssClass;
    this.beforeCssClass_ = beforeCssClass;
    this.afterCssClass_ = afterCssClass;
    this.allowLooping_ = allowLooping;
    this.container_ = container;
    this.lastActiveSlide_ = null;
    this.onTransitionCallbacks_ = onTransitionCallbacks;
    this.slides_ = slides;
    this.transition_ = transition;
    this.transitionTarget_ = null;
    this.interactions_ = [];
    this.destroyed_ = false;
    this.slideCssClasses_ =
      DynamicDefaultMap.usingFunction<HTMLElement, Set<string>>(
        () => new Set<string>());

    /** Mapped Set caches to avoid allocation churn */
    this.activeCssClassSet_ = new Set([activeCssClass]);
    this.beforeCssClassMap_ =
      DynamicDefaultMap.usingFunction<number, Set<string>>(
        (index) => {
          return new Set(
            [this.beforeCssClass_, `${this.beforeCssClass_}--${index}`]);
        });
    this.afterCssClassMap_ =
      DynamicDefaultMap.usingFunction<number, Set<string>>(
        (index) => {
          return new Set(
            [this.afterCssClass_, `${this.afterCssClass_}--${index}`]);
        });


    this.init_();
  }

  public allowsLooping() {
    return this.allowLooping_;
  }

  public getLastActiveSlide(): HTMLElement {
    return this.lastActiveSlide_;
  }

  private clearTransitionTarget_(): void {
    this.transitionTarget_ = null;
  }

  public transitionToSlide(targetSlide: HTMLElement): void {
    if (this.isBeingInteractedWith()) {
      return;
    }
    this.transitionTarget_ = targetSlide;
  }

  private init_(): void {
    this.transition_.init(this.getSlides()[0], this);
    this.render_();
  }

  public isTransitioning(): boolean {
    return this.transitionTarget_ !== null;
  }

  public isBeingInteractedWith(interaction: symbol = null): boolean {
    return this.interactions_.length > 0 &&
      (!toBool(interaction) || this.interactions_.indexOf(interaction) !== -1);
  }

  public isIdle(): boolean {
    return !this.isTransitioning() && !this.isBeingInteractedWith();
  }

  private render_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      this.transition_.renderLoop(this); // Run the transition's render loop
      this.handleTransition_();

      const activeSlide = this.getActiveSlide();

      if (activeSlide !== this.lastActiveSlide_) {
        this.lastActiveSlide_ = activeSlide;
        this.onTransitionCallbacks_.forEach((callback) => callback(this));

        if (activeSlide) {
          renderLoop.mutate(() => this.updateClasses_(activeSlide));
        }

        // Sync other carousels.
        CarouselSyncManager.getSingleton()
          .transitionToIndex(this, this.getSlideIndex(activeSlide));
      }
    });
  }

  private updateClasses_(activeSlide: HTMLElement) {
    const slidesBefore = this.getSlidesBefore(activeSlide);
    const slidesAfter = this.getSlidesAfter(activeSlide);

    const adjustCssClasses =
      (slide: HTMLElement, cssClassesToKeep: Set<string>) => {
        const currentCssClasses = this.slideCssClasses_.get(slide);
        const classesToRemove = subtract(currentCssClasses, cssClassesToKeep);
        this.slideCssClasses_.set(slide, cssClassesToKeep);
        removeClassesIfPresent(slide, Array.from(classesToRemove));
        addClassesIfMissing(slide, Array.from(cssClassesToKeep));
      };

    adjustCssClasses(activeSlide, this.activeCssClassSet_);

    slidesBefore.reverse()
      .forEach((slide, index) => {
        adjustCssClasses(slide, this.beforeCssClassMap_.get(index));
      });

    slidesAfter
      .forEach((slide, index) => {
        adjustCssClasses(slide, this.afterCssClassMap_.get(index));
      });
  }

  private handleTransition_() {
    if (this.isTransitioning()) {
      if (this.transition_.hasTransitionedTo(this.transitionTarget_, this)) {
        this.transitionTarget_ = null;
      } else {
        this.transition_.transition(this.transitionTarget_, this);
      }
    }
  }

  public getActiveSlide(): HTMLElement {
    return this.transition_.getActiveSlide(this);
  }

  public getActiveClass(): string {
    return this.activeCssClass_;
  }

  public getActiveSlideIndex(): number {
    return this.getSlideIndex(this.getActiveSlide());
  }

  public getFirstSlide(): HTMLElement {
    return this.slides_[0];
  }

  public getLastSlide(): HTMLElement {
    return this.slides_[this.slides_.length - 1];
  }

  public getSlideIndex(slide: HTMLElement): number {
    return this.getSlides().indexOf(slide);
  }

  public getSlidesBetween(a: HTMLElement, b: HTMLElement): HTMLElement[] {
    return this.getSlides()
      .slice(this.getSlideIndex(a) + 1, this.getSlideIndex(b));
  }

  public getContainer(): HTMLElement {
    return this.container_;
  }

  public getSlides(): HTMLElement[] {
    return [...this.slides_];
  }

  public getVisibleSlides(): HTMLElement[] {
    return this.getSlides()
      .filter((slide) => isVisible(slide, this.getContainer()));
  }

  public getSlidesBefore(slide: HTMLElement): HTMLElement[] {
    if (this.allowsLooping()) {
      return splitEvenlyOnItem(this.getSlides(), slide, true)[0];
    } else {
      return this.getSlides().slice(0, this.getSlides().indexOf(slide));
    }
  }

  public getSlidesAfter(slide: HTMLElement): HTMLElement[] {
    if (this.allowsLooping()) {
      return splitEvenlyOnItem(this.getSlides(), slide, true)[1];
    } else {
      return this.getSlides().slice(this.getSlides().indexOf(slide) + 1);
    }
  }

  public next(): void {
    this.transitionSlidesBy(1);
  }

  public previous(): void {
    this.transitionSlidesBy(-1);
  }

  public startInteraction(interaction: symbol = INTERACTION): void {
    this.clearTransitionTarget_();
    this.interactions_.push(interaction);
  }

  public endInteraction(interaction: symbol = INTERACTION): void {
    this.interactions_ = removeFirstInstance(this.interactions_, interaction);
  }

  private getCurrentTransitionTarget_(): HTMLElement {
    return this.isTransitioning() ?
      this.transitionTarget_ :
      this.getActiveSlide();
  }

  public transitionSlidesBy(value: number): void {
    const nextIndex =
      this.getSlides().indexOf(this.getCurrentTransitionTarget_()) + value;
    this.transitionToIndex(nextIndex);
  }

  public transitionToIndex(index: number, skipSync: boolean = false): void {
    if (!skipSync) {
      CarouselSyncManager.getSingleton().transitionToIndex(this, index);
    }

    const clampedIndex = this.getClampedIndex_(index);
    this.transitionToSlide(this.getSlides()[clampedIndex]);
  }

  private getClampedIndex_(index: number): number {
    const slidesLength = this.getSlides().length;
    if (this.allowsLooping()) {
      const clampedIndex = index % slidesLength; // Can be any sign
      return (clampedIndex + slidesLength) % slidesLength; // Make positive
    } else {
      return new NumericRange(0, slidesLength - 1).clamp(index);
    }
  }

  public transitionToSlideByIndex(index: number): void {
    this.transitionToSlide(this.getSlideByIndex(index));
  }

  public getSlideByIndex(index: number): HTMLElement {
    return this.slides_[index];
  }

  destroy() {
    this.destroyed_ = true;
    CarouselSyncManager.getSingleton().destroyCarousel(this);
  }
}

export {Carousel};
