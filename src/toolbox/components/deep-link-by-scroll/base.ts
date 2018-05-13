import {Scroll} from '../../utils/cached-vectors/scroll';
import {renderLoop} from '../../utils/render-loop';
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

const windowScroll: Scroll = Scroll.getSingleton();

class DeepLinkByScroll {
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

      // Do nothing if there's been no scrolling
      if (windowScroll.getDelta().getLength() === 0) {
        return;
      }

      const currentAnchorId: string =
        `#${(<HTMLElement>this.getCurrentAnchor_(this.getAnchorsFn_)).id}`;

      // Do nothing if the hash hasn't changed
      if (window.location.hash === currentAnchorId) {
        return;
      }

      renderLoop.mutate(
        () => history.replaceState(undefined, undefined, currentAnchorId));
    });
  }
}

export {DeepLinkByScroll};
