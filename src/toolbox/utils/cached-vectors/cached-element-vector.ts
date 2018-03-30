import {DynamicDefaultMap} from '../map/dynamic-default';
import {MultiValueDynamicDefaultMap} from '../map/multi-value-dynamic-default';
import {Vector} from '../math/geometry/vector';
import {renderLoop} from '../render-loop';

const VALUE_LIMIT: number = 2;

const caches: DynamicDefaultMap<CachedElementVector, MultiValueDynamicDefaultMap> =
  DynamicDefaultMap.usingFunction<any, any>(
    (Class) => {
      return MultiValueDynamicDefaultMap.usingFunction(
        (...args) => new Class(...args));
    });

class CachedElementVector {
  private element: Element;
  private values: Vector[];

  constructor(element = null, ...args: any[]) {
    if (this[Symbol.species].getInstancesByElement().has([element, ...args])) {
      if (element) {
        console.error('Please use getForElement instead of new.');
      } else {
        console.error('Please use getSingleton instead of new.');
      }
    }
    this.element = element;
    this.values = [new (this.getVectorClass())()];
    this.init();
  }

  private static getInstancesByElement(): MultiValueDynamicDefaultMap<CachedElementVector, CachedElementVector> {
    return caches.get(this);
  }

  private static getVectorClass(): typeof Vector {
    return Vector;
  }

  public getVectorClass(): typeof Vector {
    return this[Symbol.species].getVectorClass();
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

  private getValues(): number[] {
    console.error('getValues must be overridden by child class');
    return [];
  }

  private getCurrentVector(): Vector {
    return new (this.getVectorClass())(...this.getValues());
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

  public getDelta(): Vector {
    return this.getVectorClass().subtract(...this.getCurrentAndLastValue());
  }

  public hasChanged(): boolean {
    return !this.getVectorClass().areEqual(...this.getCurrentAndLastValue());
  }

  private static getValueLimit(): number {
    return VALUE_LIMIT;
  }

  public static getForElement(...args): this {
    return this.getInstancesByElement().get(...args);
  }

  public static getSingleton(): this {
    return this.getInstancesByElement().get(null);
  }
}

export {CachedElementVector};
