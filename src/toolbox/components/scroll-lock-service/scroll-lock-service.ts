import { SCROLL_ELEMENT } from '../../utils/dom/position/scroll-element';
import { setStyle } from '../../utils/dom/style/set-style';
import {UserAgent} from "../../utils/user-agent/user-agent";
import {Safari} from "../../utils/user-agent/browser/safari";

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
    if (UserAgent.getBrowser() === Safari) {
      return; // Elegant locking is not possible for Safari
    }
    if (this.counter_ === 0) {
      const width = (<HTMLElement>SCROLL_ELEMENT).offsetWidth;
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'overflow', 'hidden');
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'width', `${width}px`);
    }
    this.counter_++;
  }

  public unlockScroll(): void {
    if (UserAgent.getBrowser() === Safari) {
      return; // Elegant locking is not possible for Safari
    }
    if (this.counter_ === 1) {
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'overflow', '');
      setStyle(<HTMLElement>SCROLL_ELEMENT, 'width', '');
    } else if (this.counter_ < 1) {
      throw new Error(
        'You have tried to unlock the scroll more times than you have locked the scroll.');
    }
    this.counter_--;
  }
}

export { ScrollLockService };
