import {onDomContentLoad} from "../../utils/dom/on-dom-content-load";
import {SCROLL_ELEMENT} from "../../utils/dom/position/scroll-element";
import {PoliteScrollJackCoordinator} from "./polite-scroll-jack-coordinator";

interface IPoliteScrollJackOptions {
  scrollContainer?: Element,
}

class PoliteScrollJack {
  private readonly coordinator_: PoliteScrollJackCoordinator;
  private readonly targets_: HTMLElement[];

  constructor(
    targets: HTMLElement[],
    {scrollContainer = null}: IPoliteScrollJackOptions = {}
  ) {
    this.coordinator_ =
      PoliteScrollJackCoordinator.getSingleton(scrollContainer);
    this.targets_ = targets;
  }

  public static fireAndForget(
    targets: HTMLElement[],
    options: IPoliteScrollJackOptions = {}
  ): PoliteScrollJack {
    const politeScrollJack = new PoliteScrollJack(targets, options);
    const _ignoredPromise = onDomContentLoad(() => politeScrollJack.init());
    return politeScrollJack;
  }

  public init(): void {
    this.coordinator_.registerElements(this.targets_);
  }

  public destroy() {
    this.coordinator_.deregisterElements(this.targets_);
  }
}

export {PoliteScrollJack}
