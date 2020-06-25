import {DynamicDefaultMap} from '../map/dynamic-default';
import {MultiValueDynamicDefaultMap} from '../map/multi-value-dynamic-default';
import {Vector} from '../math/geometry/vector';
import {renderLoop} from '../render-loop';
import {ErrorService} from "../error/service";

const VALUE_LIMIT: number = 2;

type InnerCache = MultiValueDynamicDefaultMap<any, any>;
const caches: DynamicDefaultMap<any, InnerCache> =
  DynamicDefaultMap.usingFunction<any, any>(
    (Class) => {
      return MultiValueDynamicDefaultMap.usingFunction(
        (args: any[]) => new Class(...args));
    });
const uses: DynamicDefaultMap<CachedElementVector<Vector>, Set<any>> =
    DynamicDefaultMap.usingFunction(() => new Set());

abstract class CachedElementVector<T extends Vector> {
  protected static VectorClass: typeof Vector = Vector;
  protected static VALUE_LIMIT: number = VALUE_LIMIT;

  private readonly args_: any[];

  protected element: HTMLElement;
  private values: T[];
  private destroyed_: boolean;
  private destroyTimeout_: number;

  protected constructor(element: any = null, ...args: any[]) {
    const instanceByElement = caches.get(this.constructor);

    this.args_ = [element, ...args];

    if (instanceByElement.has([element, ...args])) {
      if (element) {
        ErrorService.throw('Please use getForElement instead of new.');
      } else {
        ErrorService.throw('Please use getSingleton instead of new.');
      }
    }

    this.destroyTimeout_ = null;
    this.destroyed_ = false;
    this.element = element;
    this.values = <T[]>[this.getCurrentVector_()];
    this.init();
  }

  private getVectorClass(): typeof Vector {
    return (<typeof CachedElementVector>this.constructor).VectorClass;
  }

  private init(): void {
    // Init values so that instances can be created during a measure step if
    // necessary.
    renderLoop.anyPremeasure(() => this.measureValues());
    this.render();
  }

  public getLastValue(): T {
    return this.values.slice(-1)[0];
  }

  protected getValues(): number[] {
    ErrorService.throw('getValues must be overridden by child class');
    return [];
  }

  private getCurrentVector_(): T {
    return <T>new (this.getVectorClass())(...this.getValues());
  }

  private getValueLimit_(): number {
    return (<typeof CachedElementVector>this.constructor).VALUE_LIMIT;
  }

  private render(): void {
    if (this.destroyed_) {
      return;
    }
    this.renderLoopPremeasure_(() => {
      this.renderLoopCleanup_(() => this.render());
      this.measureValues();
    });
  }

  protected renderLoopCleanup_(fn: () => void): void {
    renderLoop.anyCleanup(fn);
  }

  protected renderLoopPremeasure_(fn: () => void): void {
    renderLoop.anyPremeasure(fn);
  }

  private measureValues(): void {
    this.values =
      this.values
        .slice(-(this.getValueLimit_() - 1))
        .concat([this.getCurrentVector_()]);
  }

  private getCurrentAndLastValue(): Vector[] {
    return this.values.slice(-2);
  }

  public getDelta(): T {
    const values = this.getCurrentAndLastValue();
    return <T>this.getVectorClass().subtract(values[0], values[1]);
  }

  public hasChanged(): boolean {
    return !this.getVectorClass().areEqual(...this.getCurrentAndLastValue());
  }

  public static getForElement(use: any, args: any[]): any {
    const instance = caches.get(this).get(args);
    uses.get(instance).add(use);
    return instance;
  }

  public static getSingleton(use: any): any {
    return this.getForElement(use, [null]);
  }

  public destroy(use: any): void {
    uses.get(this).delete(use);
    clearTimeout(this.destroyTimeout_);
    this.destroyTimeout_ = window.setTimeout(
        () => {
          if (uses.size <= 0) {
            caches.get(this.constructor).delete(this.args_);
            this.destroyed_ = true;
          }
        },
        100);
  }
}

export {CachedElementVector};
