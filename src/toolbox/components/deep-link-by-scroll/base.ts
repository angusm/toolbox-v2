import {Scroll} from '../../utils/cached-vectors/scroll';
import {renderLoop} from '../../utils/render-loop';
import {setScrollTop} from '../../utils/dom/position/set-scroll-top';
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";
import {CommonSelector} from "../../utils/dom/common-selector";

const windowScroll: Scroll = Scroll.getSingleton<Scroll>();
const CLASS_NAME: string = 'deep-link-by-scroll';

class DeepLinkByScroll {
  private getCurrentAnchor_: (querySelector: string) => Node;
  private querySelector_: string;
  private alterHash_: boolean;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => Node,
    querySelector: string = CommonSelector.DEEP_LINK_TARGETS,
    alterHash: boolean = true
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.querySelector_ = querySelector;
    this.alterHash_ = alterHash;
    this.init_();
  }

  init_(): void {
    renderLoop.mutate(
      () => document.querySelector('html').classList.add(CLASS_NAME));
    this.render_();
  }

  render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());
      const currentAnchor: HTMLElement =
        <HTMLElement>this.getCurrentAnchor_(this.querySelector_);

      renderLoop.mutate(() => {
        const html: Element = <Element>document.querySelector('html');
        updateClassModifiers(html, CLASS_NAME, [currentAnchor.id]);
        if (!this.alterHash_) {
          return;
        }
        const currentScroll = windowScroll.getPosition().y;
        window.location.hash = currentAnchor.id;
        setScrollTop(currentScroll); // Reset the scroll position
      });
    });
  }
}

export {DeepLinkByScroll};
