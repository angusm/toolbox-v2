interface ITransition {
  transition(targetSlide: Element, carousel: ICarousel): void;
  init(initialSlide: Element, carousel: ICarousel): void;
}

interface ICarousel {
  transitionToSlide(targetSlide: HTMLElement): void;
  transitionToSlideImmediately(targetSlide: HTMLElement): void;
  isTransitioning(): boolean;
  isBeingInteractedWith(interaction: symbol): boolean;
  isIdle(): boolean;
  getActiveSlide(): HTMLElement;
  getActiveSlideIndex(): number;
  getSlideIndex(slide: HTMLElement): number;
  getSlidesBetween(a: HTMLElement, b: HTMLElement): HTMLElement[];
  isSlideFullyVisible_(slide: HTMLElement): boolean;
  getContainer(): HTMLElement;
  getSlides(): HTMLElement[];
  getVisibleSlides(): HTMLElement[];
  getSlidesBefore(slide: HTMLElement): HTMLElement[];
  getSlidesAfter(slide: HTMLElement): HTMLElement[];
  next(): void;
  previous(): void;
  startInteraction(interaction: symbol): void;
  endInteraction(interaction: symbol): void;
  transitionSlidesBy(value: number): void;
}

export {
  ICarousel,
  ITransition,
};