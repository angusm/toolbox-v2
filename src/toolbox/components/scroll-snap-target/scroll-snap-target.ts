import {RenderFunctionID} from "../../utils/render-function-id";
import {Scroll} from "../../utils/cached-vectors/scroll";
import {renderLoop} from "../../utils/render-loop";
import {setStyle} from "../../utils/dom/style/set-style";
import {forEach} from "../../utils/iterable-iterator/for-each";
import {getOffsetAncestors} from "../../utils/dom/position/get-offset-ancestors";

enum ScrollSnapAlign {
  BOTH = 'start end',
  TOP = 'start',
  CENTER = 'center',
  BOTTOM = 'end',
  NONE = '',
}

class Coordinator {
  private static singleton_: Coordinator;
  private readonly targetsByElement_: Map<HTMLElement, ScrollSnapTarget>;

  constructor() {
    this.targetsByElement_ = new Map();
  }

  public add(target: ScrollSnapTarget) {
    this.targetsByElement_.set(target.getElement(), target);

    getOffsetAncestors(target.getElement().parentElement).forEach(
      (ancestor) => {
        if (this.targetsByElement_.has(ancestor)) {
          this.targetsByElement_.get(ancestor).destroy();
          this.targetsByElement_.delete(ancestor);
        }
      });
  }

  public delete(target: ScrollSnapTarget) {
    this.targetsByElement_.delete(target.getElement());
  }

  public static getSingleton(): Coordinator {
    return this.singleton_ = this.singleton_ || new this();
  }
}

class ScrollSnapTarget {
  private readonly element_: HTMLElement;
  private readonly resizeHandler_: () => void;
  private readonly scroll_: Scroll;
  private lastSnapValue_: string;
  private runScrollLoop_: boolean;
  private rfIds_: Set<RenderFunctionID>;

  constructor(element: HTMLElement) {
    this.element_ = element;
    this.resizeHandler_ = () => this.handleResize_();
    this.runScrollLoop_ = true;
    this.rfIds_ = new Set();
    this.lastSnapValue_ = null;
    this.scroll_ = Scroll.getSingleton();
  }

  public static fireAndForget(element: HTMLElement): ScrollSnapTarget {
    const instance = new ScrollSnapTarget(element);
    instance.init_();
    return instance;
  }

  private init_(): void {
    Coordinator.getSingleton().add(this);
    this.handleResize_();
    window.addEventListener('resize', this.resizeHandler_);
  }

  private handleResize_(): void {
    const snapAlignValue = this.getScrollSnapAlignValue_();

    if (this.lastSnapValue_ === snapAlignValue) {
      return;
    }
    this.lastSnapValue_ = snapAlignValue;

    this.rfIds_.add(
      renderLoop.anyMutate(
        () => setStyle(this.element_, 'scroll-snap-align', snapAlignValue)));
  }

  private getScrollSnapAlignValue_(): string {
    if (this.element_.offsetHeight < window.innerHeight) {
      return ScrollSnapAlign.CENTER;
    } else {
      return ScrollSnapAlign.BOTH;
    }
  }

  public getElement(): HTMLElement {
    return this.element_;
  }

  public destroy(): void {
    Coordinator.getSingleton().delete(this);
    window.removeEventListener('resize', this.resizeHandler_);
    forEach(this.rfIds_.values(), (rfId) => renderLoop.clear(rfId));
    renderLoop.anyMutate(
      () => setStyle(this.element_, 'scroll-snap-align', ScrollSnapAlign.NONE));
  }
}

export {ScrollSnapTarget};
