import {renderLoop} from "../../utils/render-loop";
import {isScrolledPast} from "../../utils/dom/position/is-scrolled-past";
import {updateClassModifiers} from "../../utils/dom/update-class-modifiers";
import {CommonSelector} from "../../utils/dom/common-selector";

const CLASS_NAME = 'tb-id-marker';

class IdMarker {
  private selector_: string;

  constructor(selector: string = CommonSelector.DEEP_LINK_TARGETS) {
    this.selector_ = selector;
    this.init_();
  }

  private init_() {
    renderLoop.measure(() => {
      const html: Element = <Element>document.querySelector('html');
      const scrolledPastIds =
        Array.from(document.querySelectorAll(this.selector_))
          .filter((element: Node) => isScrolledPast(<HTMLElement>element))
          .map((element: Node) => (<HTMLElement>element).id);
      renderLoop.mutate(
        () => updateClassModifiers(html, CLASS_NAME, scrolledPastIds));
      renderLoop.cleanup(() => this.init_());
    });
  }
}

export {IdMarker};
