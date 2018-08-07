import {DynamicDefaultMap} from '../map/dynamic-default';
import {MultiValueDynamicDefaultMap} from '../map/multi-value-dynamic-default';
import {Vector} from '../math/geometry/vector';
import {renderLoop} from '../render-loop';

const VALUE_LIMIT: number = 2;

type InnerCache = MultiValueDynamicDefaultMap<any, any>;
const caches: DynamicDefaultMap<any, InnerCache> =
  DynamicDefaultMap.usingFunction<any, any>(
    (Class) => {
      return MultiValueDynamicDefaultMap.usingFunction(
        (args: any[]) => new Class(...args));
    });

abstract class CachedElementVector<T extends Vector> {
  protected static VectorClass: typeof Vector = Vector;
  protected static VALUE_LIMIT: number = VALUE_LIMIT;

  protected element: HTMLElement;
  private values: T[];

  constructor(element: any = null, ...args: any[]) {
    const instanceByElement = caches.get(this.constructor);

    if (instanceByElement.has([element, ...args])) {
      if (element) {
        throw new Error('Please use getForElement instead of new.');
      } else {
        throw new Error('Please use getSingleton instead of new.');
      }
    }

    this.element = element;
    this.values =
      <T[]>[new (<typeof CachedElementVector>this.constructor).VectorClass()];
    this.init();
  }

  private getVectorClass(): typeof Vector {
    return (<typeof CachedElementVector>this.constructor).VectorClass;
  }

  private init(): void {
    // Init values so that instances can be created during a measure step if
    // necessary.
    renderLoop.measure(() => this.measureValues());
    this.render();
  }

  public getLastValue(): T {
    return this.values.slice(-1)[0];
  }

  protected getValues(): number[] {
    throw new Error('getValues must be overridden by child class');
  }

  private getCurrentVector_(): T {
    return <T>new (this.getVectorClass())(...this.getValues());
  }

  private getValueLimit_(): number {
    return (<typeof CachedElementVector>this.constructor).VALUE_LIMIT;
  }

  private render(): void {
    this.renderLoopPremeasure_(() => {
      this.renderLoopCleanup_(() => this.render());
      this.measureValues();
    });
  }

  protected renderLoopCleanup_(fn: () => void): void {
    renderLoop.cleanup(fn);
  }

  protected renderLoopPremeasure_(fn: () => void): void {
    renderLoop.premeasure(fn);
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

  public static getForElement(...args: any[]): any {
    return caches.get(this).get(args);
  }

  public static getSingleton(): any {
    return caches.get(this).get([null]);
  }
}

export {CachedElementVector};
