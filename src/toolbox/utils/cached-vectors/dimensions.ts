import {CachedElementVector} from './cached-element-vector';
import {Dimensions2d} from '../math/geometry/dimensions-2d';
import {getAncestorDimensions} from "../dom/position/get-ancestor-dimensions";

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
    return getAncestorDimensions(this.element).getValues();
  }
}

export {Dimensions};
