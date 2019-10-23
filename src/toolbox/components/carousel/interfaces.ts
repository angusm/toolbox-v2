interface ITransition {
  transition(targetSlide: Element, carousel: ICarousel): void;
  init(initialSlide: Element, carousel: ICarousel): void;
  getActiveSlide(carousel: ICarousel): HTMLElement;
  hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean;
  renderLoop(carousel: ICarousel): void;
}

interface ICarousel {
  allowsLooping(): boolean;
  transitionToSlide(targetSlide: HTMLElement): void;
  isTransitioning(): boolean;
  isBeingInteractedWith(interaction?: symbol): boolean;
  isIdle(): boolean;
  getActiveSlide(): HTMLElement;
  getLastActiveSlide(): HTMLElement;
  getActiveSlideIndex(): number;
  getSlideIndex(slide: HTMLElement): number;
  getSlidesBetween(a: HTMLElement, b: HTMLElement): HTMLElement[];
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
  transitionToIndex(index: number, drivenBySync: boolean): void;
  getFirstSlide(): HTMLElement;
  getLastSlide(): HTMLElement;
  onTransition(callback: (carousel: ICarousel) => void): void;
  onDestroy(callback: (carousel: ICarousel) => void): void;
}

interface ICarouselOptions {
  onTransitionCallbacks?: ((carousel: ICarousel) => void)[],
  onDestroyCallbacks?: ((carousel: ICarousel) => void)[],
  activeCssClass?: string,
  beforeCssClass?: string,
  afterCssClass?: string,
  allowLooping?: boolean,
  transition?: ITransition,
  condition?: () => boolean,
}

export {
  ICarousel,
  ICarouselOptions,
  ITransition,
};
