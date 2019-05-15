import {renderLoop} from "../../utils/render-loop";
import {toggleClass} from "../../utils/dom/class/toggle-class";

const MODIFIER = 'active';

class ActiveElementOnCondition {
  private readonly element_: HTMLElement;
  private readonly conditionFn_: (element: HTMLElement) => boolean;
  private readonly activeClass_: string;
  private destroyed_: boolean;

  constructor(
    element: HTMLElement,
    conditionFn: (element: HTMLElement) => boolean,
    activeClass: string = MODIFIER,
  ) {
    this.element_ = element;
    this.conditionFn_ = conditionFn;
    this.activeClass_ = activeClass;
    this.destroyed_ = false;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());
      const active = this.conditionFn_(this.element_);
      renderLoop.mutate(
        () => toggleClass(this.element_, this.activeClass_, active));
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {ActiveElementOnCondition};
