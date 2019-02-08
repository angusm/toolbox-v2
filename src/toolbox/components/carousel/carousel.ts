import {Fade as FadeTransition} from './transitions/fade';
import {ICarousel, ITransition} from './interfaces';
import {isVisible} from '../../utils/dom/position/is-visible';
import {removeFirstInstance} from '../../utils/array/remove-first-instance';
import {renderLoop} from '../../utils/render-loop';
import {toBool} from "../../utils/to-bool";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {removeClassIfPresent} from "../../utils/dom/class/remove-class-if-present";
import {CarouselSyncManager} from './sync-manager';

const defaultTransition: ITransition = new FadeTransition();
const INTERACTION: symbol = Symbol('interaction');
const CssClass = Object.freeze({
  ACTIVE_SLIDE: 'active',
});

class Carousel implements ICarousel {
  readonly activeClass_: string;
  readonly container_: HTMLElement;
  readonly slides_: HTMLElement[];
  readonly transition_: ITransition;
  private transitionTarget_: HTMLElement;
  private interactions_: symbol[];

  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      activeCssClass = CssClass.ACTIVE_SLIDE,
      transition = defaultTransition,
    }: {
      activeCssClass?: string,
      transition?: ITransition,
    } = {}
  ) {
    this.activeClass_ = activeCssClass;
    this.container_ = container;
    this.slides_ = slides;
    this.transition_ = transition;
    this.transitionTarget_ = null;
    this.interactions_ = [];

    this.init_();
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
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      this.transition_.renderLoop(this); // Run the transition's render loop
      this.handleTransition_();

      const activeSlide = this.getActiveSlide();
      const inactiveSlides =
        this.getSlides().filter((slide) => slide !== activeSlide);
      renderLoop.mutate(() => {
        addClassIfMissing(activeSlide, this.activeClass_);
        inactiveSlides
          .forEach((slide) => removeClassIfPresent(slide, this.activeClass_));
      });
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

  public getActiveSlideIndex(): number {
    return this.getSlideIndex(this.getActiveSlide());
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
    return this.getSlides().slice(0, this.getSlides().indexOf(slide));
  }

  public getSlidesAfter(slide: HTMLElement): HTMLElement[] {
    return this.getSlides().slice(this.getSlides().indexOf(slide) + 1);
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

    const slidesLength = this.getSlides().length;
    const clampedIndex = index % slidesLength;
    const positiveIndex = (clampedIndex + slidesLength) % slidesLength;
    this.transitionToSlide(this.getSlides()[positiveIndex]);
  }
}

export {Carousel};
