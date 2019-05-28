import { ILazyLoadedImageOptions } from './i-lazy-loaded-image-options';
import { addClassIfMissing } from '../../utils/dom/class/add-class-if-missing';
import { renderLoop } from '../../utils/render-loop';
import { getVisibleDistanceFromRoot } from '../../utils/dom/position/vertical/get-visible-distance-from-root';

const defaultOptions: ILazyLoadedImageOptions = {
  getLoadedCssClass: null,
  getLoadDistance: () => window.innerHeight,
  callbacks: []
};

class LazyLoaded {
  private readonly element_: HTMLImageElement;
  private readonly url_: string;
  private readonly callbacks_: ((
    imageElement: HTMLImageElement,
    imageUrl: string
  ) => void)[];
  private readonly getLoadDistance_: (
    imageElement: HTMLImageElement,
    imageUrl: string
  ) => number;

  constructor(
    imageElement: HTMLImageElement,
    imageUrl: string,
    {
      getLoadedCssClass = defaultOptions.getLoadedCssClass,
      getLoadDistance = defaultOptions.getLoadDistance,
      callbacks = defaultOptions.callbacks
    }: ILazyLoadedImageOptions = defaultOptions
  ) {
    this.element_ = imageElement;
    this.url_ = imageUrl;
    this.callbacks_ =
      getLoadedCssClass === null
        ? callbacks
        : [
            ...callbacks,
            (element, url) => {
              addClassIfMissing(element, getLoadedCssClass(element));
            }
          ];
    this.getLoadDistance_ = getLoadDistance;
  }

  public init(): void {
    this.renderLoop_();
  }

  public static fireAndForget(
    element: HTMLImageElement,
    url: string,
    options: ILazyLoadedImageOptions = defaultOptions
  ): LazyLoaded {
    const lazyLoadedImage = new this(element, url, options);
    lazyLoadedImage.init();
    return lazyLoadedImage;
  }

  public loadImage(
    url: string,
    element: HTMLElement | HTMLImageElement,
    callbacks: ((imageElement: HTMLImageElement, imageUrl: string) => void)[]
  ): void {
    return;
  }

  private renderLoop_(): void {
    renderLoop.scrollMeasure(() => {
      const loadDistance = this.getLoadDistance_(this.element_, this.url_);
      const distanceFromRoot = getVisibleDistanceFromRoot(this.element_);

      if (distanceFromRoot < loadDistance) {
        this.loadImage(this.url_, this.element_, this.callbacks_);
      } else {
        renderLoop.scrollCleanup(() => {
          this.renderLoop_();
        });
      }
    });
  }
}

export { LazyLoaded };
