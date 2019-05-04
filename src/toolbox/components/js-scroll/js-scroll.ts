import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {applyScroll} from "../../utils/dom/position/apply-scroll";
import {UserAgent} from "../../utils/user-agent/user-agent";
import {IE} from "../../utils/user-agent/browser/ie";

const thirdEventListenerParam =
  UserAgent.getBrowser() === IE ?
    true : {passive: false, capture: true, once: false};

class JsScroll {
  private readonly wheelHandler_: (e: WheelEvent) => void;
  private initializationCount_: number;

  constructor() {
    this.initializationCount_ = 0;
    this.wheelHandler_ = (e) => {
      this.scrollManually_(e);
      return false;
    };
  }

  public init(): void {
    if (this.initializationCount_ === 0) {
      if (document.readyState === 'complete') {
        this.addEventListener_();
      } else {
        window.addEventListener('load', () => this.addEventListener_());
      }
    }
    this.initializationCount_++;
  }

  private addEventListener_() {
    window.addEventListener(
      'wheel', this.wheelHandler_, thirdEventListenerParam);
  }

  private scrollManually_(e: WheelEvent): void {
    e.preventDefault();
    applyScroll(
      Vector2d.fromWheelEvent(e),
      {
        target: <Element>e.target,
        applyImmediately: true,
      });
  }

  public destroy(): void {
    this.initializationCount_--;
    if (this.initializationCount_ === 0) {
      window.removeEventListener(
        'wheel', this.wheelHandler_, thirdEventListenerParam);
    }
  }
}

const jsScroll = new JsScroll();

export {jsScroll};
