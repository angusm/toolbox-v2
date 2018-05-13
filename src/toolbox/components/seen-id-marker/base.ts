import {isAbove} from "../../utils/dom/position/is-above";
import {renderLoop} from "../../utils/render-loop";
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

const CLASS_NAME = 'tb-id-marker';

class SeenIdMarker {
  private getCurrentAnchor_: (getAnchorsFn: () => HTMLElement[]) => HTMLElement;
  private getAnchorsFn_: () => HTMLElement[];

  constructor(
    getCurrentAnchorFn: (getAnchorsFn: () => HTMLElement[]) => HTMLElement,
    getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector,
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.getAnchorsFn_ = getAnchorsFn;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const currentAnchor: HTMLElement =
        <HTMLElement>this.getCurrentAnchor_(this.getAnchorsFn_);

      const html: Element = <Element>document.querySelector('html');
      const scrolledPastIds: string[] =
        this.getAnchorsFn_()
          .filter((element: HTMLElement) => isAbove(element, currentAnchor))
          .map((element: Node) => (<HTMLElement>element).id)
          .concat(currentAnchor.id);

      renderLoop.mutate(
        () => updateClassModifiers(html, CLASS_NAME, scrolledPastIds));
    });
  }
}

export {SeenIdMarker};
