class RenderStep {
  public static readonly CLEANUP = Symbol('Cleanup');
  public static readonly FRAME_COUNT = Symbol('Frame Count');
  public static readonly MEASURE = Symbol('Measure');
  public static readonly PHYSICS = Symbol('Physics');
  public static readonly MUTATE = Symbol('Mutate');
  public static readonly PRE_MEASURE = Symbol('Pre-measure');
  public static readonly SCROLL_PRE_MEASURE = Symbol('Scroll-measure');
  public static readonly SCROLL_MEASURE = Symbol('Scroll-measure');
  public static readonly SCROLL_MUTATE = Symbol('Scroll-mutate');
  public static readonly ANY_MUTATE = Symbol('any-mutate');
  public static readonly SCROLL_CLEANUP = Symbol('Scroll-cleanup');
}

const ALL_STEP_ORDER: Array<symbol> = [
  RenderStep.FRAME_COUNT,
  RenderStep.PRE_MEASURE,
  RenderStep.SCROLL_PRE_MEASURE,
  RenderStep.MEASURE,
  RenderStep.SCROLL_MEASURE,
  RenderStep.MUTATE,
  RenderStep.SCROLL_MUTATE,
  RenderStep.ANY_MUTATE,
  RenderStep.CLEANUP,
  RenderStep.SCROLL_CLEANUP,
];

const ANIMATION_FRAME_STEP_ORDER: Array<symbol> = [
  RenderStep.FRAME_COUNT,
  RenderStep.PRE_MEASURE,
  RenderStep.MEASURE,
  RenderStep.PHYSICS,
  RenderStep.MUTATE,
  RenderStep.ANY_MUTATE,
  RenderStep.CLEANUP,
];

const SCROLL_STEP_ORDER: Array<symbol> = [
  RenderStep.SCROLL_PRE_MEASURE,
  RenderStep.SCROLL_MEASURE,
  RenderStep.SCROLL_MUTATE,
  RenderStep.ANY_MUTATE,
  RenderStep.SCROLL_CLEANUP,
];

class RenderFunctionID {
  private readonly step_: symbol;

  constructor(step: symbol) {
    this.step_ = step;
  }

  get step() {
    return this.step_;
  }
}

type RenderFunction = () => void;
type RenderFunctionMap = Map<RenderFunctionID, RenderFunction>;

class RenderLoop {
  private static singleton_: RenderLoop = null;
  private static msPerFrame_: number = 1000 / 60; // Browsers target 60fps

  private readonly runLoopCallback_: (timestamp: number) => void;
  private readonly scheduledFns_: Map<symbol, RenderFunctionMap>;
  private lastRun_: number;
  private currentRun_: number;

  constructor() {
    this.scheduledFns_ = new Map<symbol, RenderFunctionMap>();
    this.lastRun_ = performance.now();

    // runLoopCallback_ is a micro-optimization to prevent creating identically
    // anonymous functions on each frame.
    this.runLoopCallback_ = (timestamp: number) => {this.runLoop(timestamp);};
    this.init_();
  }

  private init_() {
    // Manually setup map instead of using DynamicDefault to avoid performance
    // overhead.
    ALL_STEP_ORDER.forEach((step) => this.scheduledFns_.set(step, new Map()));

    this.runStepsInOrder_(ALL_STEP_ORDER);
    this.setupListeners_();
  }

  private setupListeners_() {
    this.setupScrollListener_();
    this.setupRequestAnimationFrame_();
  }

  private setupRequestAnimationFrame_() {
    window.requestAnimationFrame(this.runLoopCallback_);
  }

  private setupScrollListener_() {
    window.addEventListener(
      'scroll',
      () => this.runScrollLoop(),
      {passive: true, capture: false, once: true});
  }

  public framecount(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.FRAME_COUNT);
  }

  public premeasure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.PRE_MEASURE)
  }

  public measure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.MEASURE);
  }

  public physics(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.PHYSICS);
  }

  public mutate(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.MUTATE);
  }

  public cleanup(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.CLEANUP);
  }

  public scrollPremeasure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.SCROLL_PRE_MEASURE);
  }

  public scrollMeasure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.SCROLL_MEASURE);
  }

  public scrollMutate(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.SCROLL_MUTATE);
  }

  scrollCleanup(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.SCROLL_CLEANUP);
  }

  public anyMutate(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep_(fn, RenderStep.ANY_MUTATE);
  }

  private addFnToStep_(fn: RenderFunction, step: symbol): RenderFunctionID {
    const renderFn = new RenderFunctionID(step);
    this.scheduledFns_.get(step).set(renderFn, fn);
    return renderFn;
  }

  /**
   * Runs all functions in the render loop.
   *
   * Use with caution!
   * Calling this manually should be avoided if at all possible.
   */
  public runLoop(currentTime: number = null): void {
    this.currentRun_ = currentTime || performance.now();
    this.runStepsInOrder_(ANIMATION_FRAME_STEP_ORDER);
    this.lastRun_ = this.currentRun_;
    window.requestAnimationFrame(this.runLoopCallback_);
  }

  /**
   * Returns the time since the last render loop in milliseconds
   */
  public getElapsedMilliseconds(): number {
    return this.currentRun_ - this.lastRun_;
  }

  public getElapsedSeconds(): number {
    return this.getElapsedMilliseconds() / 1000;
  }

  /**
   * Runs all functions in the scroll loop.
   *
   * Use with caution!
   * Calling this manually should be avoided if at all possible.
   */
  public runScrollLoop(): void {
    this.runStepsInOrder_(SCROLL_STEP_ORDER);
    this.setupScrollListener_();
  }

  private runStepsInOrder_(stepOrder: Array<symbol>): void {
    stepOrder.forEach((step) => this.runFnsForStep_(step));
  }

  private runFnsForStep_(step: symbol): void {
    const fns = this.scheduledFns_.get(step).values();
    let nextFn;
    while (nextFn = fns.next().value) {
      nextFn();
    }
    this.scheduledFns_.set(step, new Map());
  }

  public clear(renderFn: RenderFunctionID): void {
    this.scheduledFns_.get(renderFn.step).delete(renderFn);
  }

  public static getSingleton(): RenderLoop {
    return RenderLoop.singleton_ = RenderLoop.singleton_ || new this();
  }

  public getFps() {
    return 60;
  }

  public getTargetFrameLength() {
    return RenderLoop.msPerFrame_;
  }

  public getMsPerFrame() {
    return RenderLoop.msPerFrame_;
  }

  // DEPRECATED
  public setFps() {
    console.warn(
      'DEPRECATED: RenderLoop support for custom frame-rates has been ' +
      'dropped. Defaulting to maximum FPS per browser. This is to reduce ' +
      'overhead inside the loop.');
  }
}

const renderLoop = RenderLoop.getSingleton();
export {renderLoop};
