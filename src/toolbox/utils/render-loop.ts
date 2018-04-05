import {DynamicDefaultMap} from './map/dynamic-default';

class Step {
  public static readonly CLEANUP = Symbol('Cleanup');
  public static readonly FRAME_COUNT = Symbol('Frame Count');
  public static readonly MEASURE = Symbol('Measure');
  public static readonly MUTATE = Symbol('Mutate');
  public static readonly PRE_MEASURE = Symbol('Pre-measure');
}

const STEP_ORDER: Array<symbol> = [
  Step.FRAME_COUNT,
  Step.PRE_MEASURE,
  Step.MEASURE,
  Step.MUTATE,
  Step.CLEANUP,
];

const FPS = Number.MAX_VALUE;

class RenderFunctionID {
  private step_: symbol;

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

  private fps_: number;
  private lastRun_: number;
  private scheduledFns_: DynamicDefaultMap<symbol, RenderFunctionMap>;

  constructor() {
    this.scheduledFns_ =
      DynamicDefaultMap
        .usingFunction<symbol, RenderFunctionMap>(
          (unused: symbol) => new Map<RenderFunctionID, RenderFunction>());
    this.fps_ = FPS;
    this.lastRun_ = null;
    this.runLoop();
  }

  public framecount(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, Step.FRAME_COUNT);
  }

  public premeasure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, Step.PRE_MEASURE)
  }

  public measure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, Step.MEASURE);
  }

  public mutate(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, Step.MUTATE);
  }

  public cleanup(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, Step.CLEANUP);
  }

  public setFps(fps: number): void {
    this.fps_ = fps;
  }

  private addFnToStep(fn: RenderFunction, step: symbol): RenderFunctionID {
    const renderFn = new RenderFunctionID(step);
    this.scheduledFns_.get(step).set(renderFn, fn);
    return renderFn;
  }

  private getTimeUntilNextRun(): number {
    return new Date().valueOf() - (this.lastRun_ + (1000 / this.fps_));
  }

  private runLoop(): void {
    console.log(1000 / (new Date().valueOf() - this.lastRun_));
    this.lastRun_ = new Date().valueOf();

    this.runFns();
    const timeUntilNextRun = this.getTimeUntilNextRun();
    if (timeUntilNextRun > 2) {
      setTimeout(
        () => window.requestAnimationFrame(() => this.runLoop()),
        timeUntilNextRun);
    } else {
      window.requestAnimationFrame(() => this.runLoop())
    }
  }

  private runFns(): void {
    STEP_ORDER.forEach((step) => this.runFnsForStep(step));
  }

  private runFnsForStep(step: symbol): void {
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
}

const renderLoop = RenderLoop.getSingleton();
export {renderLoop};
