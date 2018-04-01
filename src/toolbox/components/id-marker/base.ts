import {renderLoop} from "../../utils/render-loop";
import {isScrolledPast} from "../../utils/dom/position/is-scrolled-past";
import {updateClassModifiers} from "../../utils/dom/update-class-modifiers";

const CLASS_NAME = 'tb-id-marker';

class IdMarker {
  private elements_: NodeList;

  constructor(elements: NodeList) {
    this.elements_ = elements;
    this.init_();
  }

  private init_() {
    renderLoop.measure(() => {
      const html: Element = <Element>document.querySelector('html');
      const scrolledPastIds =
        Array.from(this.elements_)
          .filter((element: Node) => isScrolledPast(<HTMLElement>element))
          .map((element: Node) => (<HTMLElement>element).id);
      renderLoop.mutate(
        () => updateClassModifiers(html, CLASS_NAME, scrolledPastIds));
      renderLoop.cleanup(() => this.init_());
    });
  }
}

export {IdMarker};
