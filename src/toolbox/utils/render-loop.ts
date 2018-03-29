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
  private static singleton: RenderLoop = null;

  private scheduledFns:
    DynamicDefaultMap<symbol, RenderFunctionMap>;
  private lastRunTime: number;
  private fps: number;

  constructor() {
    this.scheduledFns =
      DynamicDefaultMap
        .usingFunction<symbol, RenderFunctionMap>(
          (unused: symbol) => new Map<RenderFunctionID, RenderFunction>());
    this.lastRunTime = 0;
    this.fps = FPS;
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
    this.fps = fps;
  }

  private addFnToStep(fn: RenderFunction, step: symbol): RenderFunctionID {
    const renderFn = new RenderFunctionID(step);
    this.scheduledFns.get(step).set(renderFn, fn);
    return renderFn;
  }

  private getTimeUntilNextRun(): number {
    return this.lastRunTime + 1000 / this.fps - new Date().valueOf();
  }

  private runLoop(): void {
    if (this.getTimeUntilNextRun() > 0) {
      setTimeout(() => this.runLoop(), this.getTimeUntilNextRun());
    } else {
      this.runFns();
      this.lastRunTime = new Date().valueOf();
      window.requestAnimationFrame(() => this.runLoop());
    }
  }

  private runFns(): void {
    STEP_ORDER.forEach((step) => this.runFnsForStep(step));
  }

  private runFnsForStep(step: symbol): void {
    const fns = this.scheduledFns.get(step).values();
    let nextFn;
    while (nextFn = fns.next().value) {
      nextFn();
    }
    this.scheduledFns.set(step, new Map());
  }

  public clear(renderFn: RenderFunctionID): void {
    this.scheduledFns.get(renderFn.step).delete(renderFn);
  }

  public static getSingleton(): RenderLoop {
    return RenderLoop.singleton = RenderLoop.singleton || new this();
  }
}

const renderLoop = RenderLoop.getSingleton();
export {renderLoop};
