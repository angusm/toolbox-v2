import {Scroll} from '../../utils/cached-vectors/scroll';
import {renderLoop} from '../../utils/render-loop';
import {setScrollTop} from '../../utils/dom/position/set-scroll-top';

const windowScroll: Scroll = Scroll.getSingleton<Scroll>();
const CLASS_NAME: string = 'deep-link-by-scroll';

function updateClassList(anchorId: string) {
  const classToAdd: string = `${CLASS_NAME}--${anchorId}`;
  const html: Element = <Element>document.querySelector('html');
  const classesToRemove: string[] =
    Array.from(html.classList)
      .filter(
        (className) => {
          return className.indexOf(CLASS_NAME) !== -1 &&
            className !== CLASS_NAME &&
            className !== classToAdd;
        });
  classesToRemove.forEach((className) => html.classList.remove(className));
  if (!html.classList.contains(classToAdd)) {
    html.classList.add(classToAdd);
  }
}

class DeepLinkByScroll {
  private alterHash_: boolean;
  private lastHash_: string;
  private getCurrentAnchor_: () => Node;

  constructor(getCurrentAnchorFn: () => Node, alterHash: boolean = true) {
    this.alterHash_ = alterHash;
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.lastHash_ = null;
    this.init_();
  }

  init_(): void {
    renderLoop.mutate(
      () => document.querySelector('html').classList.add(CLASS_NAME));
    this.render_();
  }

  render_(): void {
    renderLoop.measure(() => {
      const currentAnchor: HTMLElement = <HTMLElement>this.getCurrentAnchor_();

      // Do nothing if the hash hasn't changed.
      if (window.location.hash === currentAnchor.id) {
        return;
      }

      renderLoop.mutate(() => {
        updateClassList(currentAnchor.id);
        if (!this.alterHash_) {
          return;
        }
        const currentScroll = windowScroll.getPosition().y;
        window.location.hash = currentAnchor.id;
        setScrollTop(currentScroll); // Reset the scroll position
      });
      renderLoop.cleanup(() => this.render_());
    });
  }
}

export {DeepLinkByScroll};
