import {renderLoop} from "../../utils/render-loop";
import {isScrolledPast} from "../../utils/dom/position/is-scrolled-past";
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";
import {CommonSelector} from "../../utils/dom/common-selector";
import {isAbove} from "../../utils/dom/position/is-above";

const CLASS_NAME = 'tb-id-marker';

class IdMarker {
  private getCurrentAnchor_: (querySelector: string) => Node;
  private querySelector_: string;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => Node,
    querySelector: string = CommonSelector.DEEP_LINK_TARGETS,
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.querySelector_ = querySelector;
    this.init_();
  }

  private init_() {
    renderLoop.measure(() => {
      const currentAnchor: HTMLElement =
        <HTMLElement>this.getCurrentAnchor_(this.querySelector_);
      const html: Element = <Element>document.querySelector('html');
      const scrolledPastIds =
        Array.from(document.querySelectorAll(this.querySelector_))
          .filter((element: HTMLElement) => isAbove(element, currentAnchor))
          .map((element: Node) => (<HTMLElement>element).id);
      renderLoop.mutate(
        () => updateClassModifiers(html, CLASS_NAME, scrolledPastIds));
      renderLoop.cleanup(() => this.init_());
    });
  }
}

export {IdMarker};
