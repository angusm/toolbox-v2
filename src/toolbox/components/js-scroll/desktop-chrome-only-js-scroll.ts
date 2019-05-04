import {UserAgent} from "../../utils/user-agent/user-agent";
import {chromeOnlyJsScroll} from "./chrome-only-js-scroll";

class DesktopChromeOnlyJsScroll {
  constructor() {}

  public init(): void {
    if (!UserAgent.isMobile()) {
      chromeOnlyJsScroll.init();
    }
  }

  public destroy(): void {
    if (!UserAgent.isMobile()) {
      chromeOnlyJsScroll.destroy();
    }
  }
}

const desktopChromeOnlyJsScroll = new DesktopChromeOnlyJsScroll();

export {desktopChromeOnlyJsScroll};
