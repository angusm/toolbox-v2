import {CachedElementVector} from './cached-element-vector';
import {Dimensions2d} from '../math/geometry/dimensions-2d';

class WindowDimensions extends CachedElementVector<Dimensions2d> {
  protected static VectorClass: typeof Dimensions2d = Dimensions2d;

  constructor(element: HTMLElement = null) {
    super(element);
  }

  protected getValues(): number[] {
    return Dimensions2d.fromInnerWindow().getValues();
  }

  public static getForElement(...args: any[]): WindowDimensions {
    throw new Error('WindowDimensions should not be used with elements');
  }

  public static getSingleton(): WindowDimensions {
    return <WindowDimensions>CachedElementVector.getSingleton.bind(this)();
  }
}

export {WindowDimensions};
