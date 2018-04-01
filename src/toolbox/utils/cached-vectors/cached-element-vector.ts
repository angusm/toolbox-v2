import {DynamicDefaultMap} from '../map/dynamic-default';
import {MultiValueDynamicDefaultMap} from '../map/multi-value-dynamic-default';
import {Vector} from '../math/geometry/vector';
import {renderLoop} from '../render-loop';

const VALUE_LIMIT: number = 2;

type InnerCache = MultiValueDynamicDefaultMap<any, CachedElementVector>;

const caches: DynamicDefaultMap<CachedElementVector, InnerCache> =
  DynamicDefaultMap.usingFunction<any, any>(
    (Class) => {
      return MultiValueDynamicDefaultMap.usingFunction(
        (...args: any[]) => new Class(...args));
    });

class CachedElementVector {
  protected element: HTMLElement;
  private values: Vector[];

  constructor(element: any = null, ...args: any[]) {
    const instanceByElement = caches.get(this.constructor);

    if (instanceByElement.has([element, ...args])) {
      if (element) {
        console.error('Please use getForElement instead of new.');
      } else {
        console.error('Please use getSingleton instead of new.');
      }
    }

    this.element = element;
    this.values = [new (this[Symbol.species].getVectorClass())()];
    this.init();
  }

  protected static getVectorClass(): typeof Vector {
    return Vector;
  }

  private init(): void {
    // Init values so that instances can be created during a measure step if
    // necessary.
    renderLoop.measure(() => this.measureValues());
    this.render();
  }

  private getLastValue(): Vector {
    return this.values.slice(-1)[0];
  }

  protected getValues(): number[] {
    console.error('getValues must be overridden by child class');
    return [];
  }

  protected getCurrentVector<T extends Vector>(): T {
    return <T>new (this[Symbol.species].getVectorClass())(...this.getValues());
  }

  private render(): void {
    renderLoop.premeasure(() => {
      this.measureValues();
      renderLoop.cleanup(() => this.render());
    });
  }

  private measureValues(): void {
    this.values =
      this.values
        .slice(-(this[Symbol.species].getValueLimit() - 1))
        .concat([this.getCurrentVector()]);
  }

  private getCurrentAndLastValue(): Vector[] {
    return this.values.slice(-2);
  }

  public getDelta<T extends Vector>(): T {
    const values = this.getCurrentAndLastValue();
    return <T>this[Symbol.species].getVectorClass()
      .subtract(values[0], values[1]);
  }

  public hasChanged(): boolean {
    return !this[Symbol.species].getVectorClass()
      .areEqual(...this.getCurrentAndLastValue());
  }

  private static getValueLimit(): number {
    return VALUE_LIMIT;
  }

  public static getForElement<T extends CachedElementVector>(
    ...args: any[]
  ): T {
    return <T>caches.get(this).get(args);
  }

  public static getSingleton<T extends CachedElementVector>(): T {
    return <T>caches.get(this).get([null]);
  }

  public get [Symbol.species](): typeof CachedElementVector {
    return <typeof CachedElementVector>this.constructor;
  }
}

export {CachedElementVector};
