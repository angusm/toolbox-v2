import { ILazyLoadedImageOptions } from './i-lazy-loaded-image-options';
import { addClassIfMissing } from '../../utils/dom/class/add-class-if-missing';
import { renderLoop } from '../../utils/render-loop';
import { getVisibleArea } from '../../utils/dom/position/get-visible-area';
import { getVisibleDistanceFromRoot } from '../../utils/dom/position/vertical/get-visible-distance-from-root';
import { loadImage } from '../../utils/loading/load-image';

const defaultOptions: ILazyLoadedImageOptions = {
  getLoadedCssClass: () => 'loaded',
  getLoadDistance: () => window.innerHeight,
  callbacks: []
};

class LazyLoadedImage {
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
    this.callbacks_ = [
      ...callbacks,
      (element, url) => {
        addClassIfMissing(element, getLoadedCssClass(element, url));
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
  ): LazyLoadedImage {
    const lazyLoadedImage = new this(element, url, options);
    lazyLoadedImage.init();
    return lazyLoadedImage;
  }

  private renderLoop_(): void {
    renderLoop.scrollMeasure(() => {
      const loadDistance = this.getLoadDistance_(this.element_, this.url_);
      const distanceFromRoot = getVisibleDistanceFromRoot(this.element_);

      if (distanceFromRoot < loadDistance) {
        loadImage(this.url_).then(() => {
          this.element_.src = this.url_;
          this.callbacks_.forEach(callback => {
            callback(this.element_, this.url_);
          });
        });
      }
    });
  }
}
