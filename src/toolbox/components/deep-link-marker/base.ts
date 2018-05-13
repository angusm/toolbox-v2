import {renderLoop} from '../../utils/render-loop';
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

const CLASS_NAME: string = 'tb-deep-link-by-scroll';

class DeepLinkMarker {
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
    renderLoop.mutate(
      () => document.querySelector('html').classList.add(CLASS_NAME));
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const currentAnchorId: string =
        (<HTMLElement>this.getCurrentAnchor_(this.getAnchorsFn_)).id;
      const html: Element = <Element>document.querySelector('html');

      renderLoop.measure(() => {
        updateClassModifiers(html, CLASS_NAME, [currentAnchorId]);
      });
    });
  }
}

export {DeepLinkMarker};
