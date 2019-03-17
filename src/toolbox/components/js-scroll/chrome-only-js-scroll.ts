import {UserAgent} from "../../utils/user-agent/user-agent";
import {jsScroll} from "./js-scroll";
import {Chrome} from "../../utils/user-agent/browser/chrome";

class ChromeOnlyJsScroll {
  constructor() {}

  public init(): void {
    if (UserAgent.getBrowser() === Chrome) {
      jsScroll.init();
    }
  }

  public destroy(): void {
    if (UserAgent.getBrowser() === Chrome) {
      jsScroll.destroy();
    }
  }
}

const chromeOnlyJsScroll = new ChromeOnlyJsScroll();

export {chromeOnlyJsScroll};
