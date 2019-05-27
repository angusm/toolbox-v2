import { LazyLoaded } from './lazy-loaded';
import { loadImage } from '../../utils/loading/load-image';
import { setStyle } from '../../utils/dom/style/set-style';

class LazyLoadedBackgroundImage extends LazyLoaded {
  public loadImage(
    url: string,
    element: HTMLElement,
    callbacks: ((imageElement: HTMLElement, imageUrl: string) => void)[]
  ): void {
    loadImage(url).then(() => {
      setStyle(element, 'background-image', `url(${url})`);
      callbacks.forEach(callback => {
        callback(element, url);
      });
    });
  }
}

export { LazyLoadedBackgroundImage };
