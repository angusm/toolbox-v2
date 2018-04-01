import {Scroll} from '../../utils/cached-vectors/scroll';
import {renderLoop} from '../../utils/render-loop';
import {setScrollTop} from '../../utils/dom/position/set-scroll-top';
import {CommonSelector} from "../../utils/dom/common-selector";

const windowScroll: Scroll = Scroll.getSingleton<Scroll>();

class DeepLinkByScroll {
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
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const currentAnchorId: string =
        (<HTMLElement>this.getCurrentAnchor_(this.querySelector_)).id;
      const currentScroll = windowScroll.getPosition().y;

      if (window.location.hash === `#${currentAnchorId}`) {
        return;
      }
      renderLoop.mutate(() => {
        window.location.hash = currentAnchorId;
        setScrollTop(currentScroll); // Reset the scroll position
      });
    });
  }
}

export {DeepLinkByScroll};
