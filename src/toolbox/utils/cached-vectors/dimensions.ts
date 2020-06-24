import {CachedElementVector} from './cached-element-vector';
import {Dimensions2d} from '../math/geometry/dimensions-2d';
import {getAncestorDimensions} from "../dom/position/get-ancestor-dimensions";

class Dimensions extends CachedElementVector<Dimensions2d> {
  protected static VectorClass: typeof Dimensions2d = Dimensions2d;

  constructor(element: HTMLElement = null) {
    super(element);
  }

  public getDimensions(): Dimensions2d {
    return this.getLastValue();
  }

  protected getValues(): number[] {
    return getAncestorDimensions(this.element).getValues();
  }

  public static getForElement(...args: any[]): Dimensions {
    return <Dimensions>CachedElementVector.getForElement.bind(this)(...args);
  }

  public static getSingleton(use: any): Dimensions {
    return <Dimensions>CachedElementVector.getSingleton.bind(this)(use);
  }
}

export {Dimensions};
