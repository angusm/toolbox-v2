import {renderLoop} from '../../utils/render-loop';
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";
import {CommonSelector} from "../../utils/dom/common-selector";

const CLASS_NAME: string = 'tb-deep-link-by-scroll';

class DeepLinkMarker {
  private getCurrentAnchor_: (querySelector: string) => Node;
  private querySelector_: string;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => Node,
    querySelector: string = CommonSelector.DEEP_LINK_TARGETS
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.querySelector_ = querySelector;
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
        (<HTMLElement>this.getCurrentAnchor_(this.querySelector_)).id;

      const html: Element = <Element>document.querySelector('html');
      renderLoop.measure(() => {
        updateClassModifiers(html, CLASS_NAME, [currentAnchorId]);
      });
    });
  }
}

export {DeepLinkMarker};
