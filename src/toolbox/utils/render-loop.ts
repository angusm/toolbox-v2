import {DynamicDefaultMap} from './map/dynamic-default';

class RenderStep {
  public static readonly CLEANUP = Symbol('Cleanup');
  public static readonly FRAME_COUNT = Symbol('Frame Count');
  public static readonly MEASURE = Symbol('Measure');
  public static readonly MUTATE = Symbol('Mutate');
  public static readonly PRE_MEASURE = Symbol('Pre-measure');
}

const STEP_ORDER: Array<symbol> = [
  RenderStep.FRAME_COUNT,
  RenderStep.PRE_MEASURE,
  RenderStep.MEASURE,
  RenderStep.MUTATE,
  RenderStep.CLEANUP,
];

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

  private msPerFrame_: number;
  private lastRun_: number;
  private scheduledFns_: DynamicDefaultMap<symbol, RenderFunctionMap>;

  constructor() {
    this.scheduledFns_ =
      DynamicDefaultMap
        .usingFunction<symbol, RenderFunctionMap>(
          (unused: symbol) => new Map<RenderFunctionID, RenderFunction>());
    this.msPerFrame_ = 0;
    this.lastRun_ = null;
    this.runLoop();
  }

  public framecount(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, RenderStep.FRAME_COUNT);
  }

  public premeasure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, RenderStep.PRE_MEASURE)
  }

  public measure(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, RenderStep.MEASURE);
  }

  public mutate(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, RenderStep.MUTATE);
  }

  public cleanup(fn: RenderFunction): RenderFunctionID {
    return this.addFnToStep(fn, RenderStep.CLEANUP);
  }

  public setFps(fps: number): void {
    this.msPerFrame_ = 1000 / fps;
  }

  private addFnToStep(fn: RenderFunction, step: symbol): RenderFunctionID {
    const renderFn = new RenderFunctionID(step);
    this.scheduledFns_.get(step).set(renderFn, fn);
    return renderFn;
  }

  private getTimeUntilNextRun(currentTime: number): number {
    return currentTime - this.lastRun_ - this.msPerFrame_;
  }

  private runLoop(): void {
    const time = <number>new Date().valueOf();
    const timeUntilNextRun = this.getTimeUntilNextRun(time);
    this.lastRun_ = time;
    this.runFns();
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
