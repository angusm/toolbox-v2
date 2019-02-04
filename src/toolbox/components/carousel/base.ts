import {Fade as FadeTransition} from './transitions/fade';
import {ICarousel, ITransition} from './interfaces';
import {getMostVisibleElement} from '../../utils/dom/position/get-most-visible-element';
import {getVisibleArea} from '../../utils/dom/position/get-visible-area';
import {isFullyVisible} from '../../utils/dom/position/is-fully-visible';
import {isVisible} from '../../utils/dom/position/is-visible';
import {removeFirstInstance} from '../../utils/array/remove-first-instance';
import {renderLoop} from '../../utils/render-loop';
import {toBool} from "../../utils/to-bool";

const defaultTransition: ITransition = new FadeTransition();
const INTERACTION: symbol = Symbol('interaction');

class Carousel implements ICarousel {
  readonly container_: HTMLElement;
  readonly factorInOpacity_: boolean;
  readonly slides_: HTMLElement[];
  private transition_: ITransition;
  private transitionTargets_: HTMLElement[];
  private interactions_: symbol[];

  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      transition = defaultTransition,
      factorInOpacity = true,
    }: {
      transition?: ITransition,
      factorInOpacity?: boolean,
    } = {}
  ) {
    this.container_ = container;
    this.factorInOpacity_ = factorInOpacity;
    this.slides_ = slides;
    this.transition_ = transition;
    this.transitionTargets_ = [];
    this.interactions_ = [];

    this.init_();
  }

  private clearTransitionTargets_(): void {
    this.transitionTargets_ = [];
  }

  public transitionToSlide(targetSlide: HTMLElement): void {
    if (this.isBeingInteractedWith()) {
      return;
    }
    this.transitionTargets_ = [...this.transitionTargets_, targetSlide];
  }

  public transitionToSlideImmediately(targetSlide: HTMLElement): void {
    this.clearTransitionTargets_();
    this.transitionToSlide(targetSlide);
  }

  private init_(): void {
    this.transition_.init(this.getSlides()[0], this);
    this.render_();
  }

  public isTransitioning(): boolean {
    return this.transitionTargets_.length > 0;
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
      this.removeCurrentlyActiveTransitionTargets_();
      if (this.getNextTransitionTarget_()) {
        this.transition_.transition(this.getNextTransitionTarget_(), this);
      }
      renderLoop.mutate(() => this.render_());
    });
  }

  public getActiveSlide(): HTMLElement {
    return getMostVisibleElement(
      this.slides_, this.container_, this.factorInOpacity_);
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

  public isSlideFullyVisible_(slide: HTMLElement): boolean {
    const otherSlides =
      this.getSlides().filter((otherSlide) => otherSlide !== slide);
    return isFullyVisible(slide, this.container_, this.factorInOpacity_) &&
      otherSlides.every(
        (otherSlide) => {
          return !getVisibleArea(
            otherSlide, this.container_, this.factorInOpacity_);
        });
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

  private getNextTransitionTarget_(): HTMLElement {
    return this.transitionTargets_[0];
  }

  private removeCurrentlyActiveTransitionTargets_(): void {
    while (
      this.getNextTransitionTarget_() &&
      this.isSlideFullyVisible_(this.getNextTransitionTarget_())
    ) {
      this.transitionTargets_ = this.transitionTargets_.slice(1);
    }
  }

  public next(): void {
    this.transitionSlidesBy(1);
  }

  public previous(): void {
    this.transitionSlidesBy(-1);
  }

  public startInteraction(interaction: symbol = INTERACTION): void {
    this.clearTransitionTargets_();
    this.interactions_.push(interaction);
  }

  public endInteraction(interaction: symbol = INTERACTION): void {
    this.interactions_ = removeFirstInstance(this.interactions_, interaction);
  }

  public transitionSlidesBy(value: number): void {
    const nextIndex = this.getSlides().indexOf(this.getActiveSlide()) + value;
    this.transitionToIndex_(nextIndex);
  }

  private transitionToIndex_(index: number): void {
    const clampedIndex = index % this.getSlides().length;
    this.transitionToSlide(this.getSlides()[clampedIndex]);
  }
}

export {Carousel};
