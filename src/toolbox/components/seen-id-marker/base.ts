import {CommonSelector} from "../../utils/dom/common-selector";
import {isAbove} from "../../utils/dom/position/is-above";
import {renderLoop} from "../../utils/render-loop";
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";

const CLASS_NAME = 'tb-id-marker';

class SeenIdMarker {
  private getCurrentAnchor_: (querySelector: string) => HTMLElement;
  private querySelector_: string;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => HTMLElement,
    querySelector: string = CommonSelector.DEEP_LINK_TARGETS,
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.querySelector_ = querySelector;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      const currentAnchor: HTMLElement =
        <HTMLElement>this.getCurrentAnchor_(this.querySelector_);

      const html: Element = <Element>document.querySelector('html');
      const scrolledPastIds: string[] =
        Array.from(document.querySelectorAll(this.querySelector_))
          .filter((element: HTMLElement) => isAbove(element, currentAnchor))
          .map((element: Node) => (<HTMLElement>element).id)
          .concat(currentAnchor.id);

      renderLoop.mutate(
        () => updateClassModifiers(html, CLASS_NAME, scrolledPastIds));

      renderLoop.cleanup(() => this.render_());
    });
  }
}

export {SeenIdMarker};
