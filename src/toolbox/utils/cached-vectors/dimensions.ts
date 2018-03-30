import {CachedElementVector} from './cached-element-vector';
import {Dimensions2d} from '../math/geometry/dimensions-2d';

class Dimensions extends CachedElementVector {
  constructor(element: HTMLElement = null) {
    super(element);
  }

  protected static getVectorClass(): typeof Dimensions2d {
    return Dimensions2d;
  }

  public getDimensions(): Dimensions2d {
    return this.getCurrentVector<Dimensions2d>();
  }

  protected getValues(): number[] {
    return [
      this.element ? this.element.offsetWidth : window.innerWidth,
      this.element ? this.element.offsetHeight : window.innerHeight
    ];
  }
}

export {Dimensions};
