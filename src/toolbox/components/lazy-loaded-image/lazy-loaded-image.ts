import { LazyLoaded } from './lazy-loaded';
import { loadImage } from '../../utils/loading/load-image';

class LazyLoadedImage extends LazyLoaded {
  public loadImage(
    url: string,
    element: HTMLImageElement,
    callbacks: ((imageElement: HTMLImageElement, imageUrl: string) => void)[]
  ): void {
    loadImage(url).then(() => {
      element.src = url;
      callbacks.forEach(callback => {
        callback(element, url);
      });
    });
  }
}

export { LazyLoadedImage };
