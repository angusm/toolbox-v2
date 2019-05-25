import { SCROLL_ELEMENT } from '../../utils/dom/position/scroll-element';
import { setStyle } from '../../utils/dom/style/set-style';

class ScrollLockService {
  public static singleton: ScrollLockService;
  private counter_: number;

  constructor() {
    this.counter_ = 0;
  }

  public static getSingleton(): ScrollLockService {
    return (this.singleton = this.singleton || new this());
  }

  public lockScroll(): void {
    if (this.counter_ === 0) {
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'overflow', 'hidden');
    }
    this.counter_++;
  }

  public unlockScroll(): void {
    if (this.counter_ === 1) {
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'overflow', '');
    } else if (this.counter_ < 1) {
      throw new Error(
        'You have tried to unlock the scroll more times than you have locked the scroll.'
      );
    }
    this.counter_--;
  }
}

export { ScrollLockService };
