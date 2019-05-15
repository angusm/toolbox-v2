import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {renderLoop} from "../../utils/render-loop";
import {TEasingFunction} from "../../shared-types/t-easing-function";
import {NumericRange} from "../../utils/math/numeric-range";
import {SCROLL_ELEMENT} from "../../utils/dom/position/scroll-element";
import {ISmoothScrollServiceOptions} from "./i-smooth-scroll-service-options";


class SmoothScrollTransition {
  private readonly distance_: NumericRange;
  private readonly timeline_: NumericRange;

  constructor(distance: NumericRange, timeline: NumericRange) {
    this.distance_ = distance;
    this.timeline_ = timeline;
  }

  getDistance(): NumericRange {
    return this.distance_;
  }

  getTimeline(): NumericRange {
    return this.timeline_;
  }
}

class SmoothScrollService {
  private static singleton_: SmoothScrollService;

  private readonly element_: Element;
  private readonly duration_: number;
  private readonly easingFunction_: TEasingFunction;
  private destroyed_: boolean;

  private xTransition_: SmoothScrollTransition;
  private yTransition_: SmoothScrollTransition;

  constructor(
    element: Element, {
      easingFunction = (x: number) => x,
      duration = 500,
    }: ISmoothScrollServiceOptions = {}
  ) {
    this.element_ = element;
    this.xTransition_ = null;
    this.yTransition_ = null;

    this.easingFunction_ = easingFunction;
    this.duration_ = duration;

    this.init_();
  }

  private init_(): void {
    [
      'mousewheel',
      'wheel',
      'interact',
      'touchstart',
      'touchmove',
      'touchend',
      'keydown',
      'resize'
    ].forEach(
      (eventName) => {
        window.addEventListener(eventName, () => this.cancelTransition());
      });
    this.renderLoop_();
  }

  public renderLoop_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.mutate(() => {
      const now = performance.now();
      this.transitionX_(now);
      this.transitionY_(now);

      renderLoop.cleanup(() => this.renderLoop_());
    });
  }

  private transitionX_(now: number): void {
    if (this.xTransition_ === null) {
      return;
    }
    this.element_.scrollLeft = this.getTransitionValue_(this.xTransition_, now);
    if (now > this.xTransition_.getTimeline().getMax()) {
      this.cancelXTransition();
    }
  }

  private transitionY_(now: number): void {
    if (this.yTransition_ === null) {
      return;
    }
    this.element_.scrollTop = this.getTransitionValue_(this.yTransition_, now);
    if (now > this.yTransition_.getTimeline().getMax()) {
      this.cancelYTransition();
    }
  }

  private cancelTransition(): void {
    this.cancelXTransition();
    this.cancelYTransition();
  }

  private cancelYTransition(): void {
    renderLoop.scrollCleanup(() => this.yTransition_ = null);
  }

  private cancelXTransition(): void {
    renderLoop.scrollCleanup(() => this.xTransition_ = null);
  }

  private getTransitionValue_(
    transition: SmoothScrollTransition,
    now: number
  ): number {
    const percent =
      this.easingFunction_(transition.getTimeline().getValueAsPercent(now));
    return transition.getDistance().getPercentAsValue(percent);
  }

  private generateTimeline_(): NumericRange {
    const startTime = performance.now();
    const endTime = startTime + this.duration_;
    return new NumericRange(startTime, endTime);
  }

  public scrollTo(target: Vector2d): void {
    const timeline = this.generateTimeline_();

    this.xTransition_ =
      new SmoothScrollTransition(
        new NumericRange(this.element_.scrollLeft, target.x),
        timeline);
    this.yTransition_ =
      new SmoothScrollTransition(
        new NumericRange(this.element_.scrollTop, target.y),
        timeline);
  }

  public scrollToX(x: number): void {
    this.xTransition_ =
      new SmoothScrollTransition(
        new NumericRange(this.element_.scrollLeft, x),
        this.generateTimeline_());
  }

  public scrollToY(y: number): void {
    this.yTransition_ =
      new SmoothScrollTransition(
        new NumericRange(this.element_.scrollTop, y), this.generateTimeline_());
  }

  public scrollXByAmount(amount: number): void {
    this.scrollToX(this.element_.scrollLeft + amount);
  }

  public scrollYByAmount(amount: number): void {
    this.scrollToY(this.element_.scrollTop + amount);
  }

  public isScrolling(): boolean {
    return this.isXScrolling() || this.isYScrolling();
  }

  public isXScrolling(): boolean {
    return this.xTransition_ !== null;
  }

  public isYScrolling(): boolean {
    return this.yTransition_ !== null;
  }

  public destroy() {
    this.destroyed_ = true;
  }

  public static getSingleton(): SmoothScrollService {
    return this.singleton_ = this.singleton_ || new this(SCROLL_ELEMENT);
  }
}

export {SmoothScrollService};
