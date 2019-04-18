import {DynamicDefaultMap} from "../../map/dynamic-default";
import {renderLoop} from "../../render-loop";

class ComputedStyleService {
  private static singleton_: ComputedStyleService = null;
  private computedStyle_: DynamicDefaultMap<Element, CSSStyleDeclaration>;

  constructor() {
    this.computedStyle_ =
      DynamicDefaultMap.usingFunction(
        (element: Element) => window.getComputedStyle(element));
    this.init_();
  }

  private init_() {
    this.renderLoop_();
  }

  getComputedStyle(element: Element) {
    return this.computedStyle_.get(element);
  }

  private renderLoop_() {
    renderLoop.anyMutate(() => {
      renderLoop.anyCleanup(() => {
        this.computedStyle_.clear();
        this.renderLoop_();
      });
    });
  }

  public static getSingleton(): ComputedStyleService {
    return this.singleton_ = this.singleton_ || new this();
  }
}

export {ComputedStyleService};
