import {CachedElementVector} from './cached-element-vector';
import {Dimensions2d} from '../math/geometry/dimensions-2d';
import {ErrorService} from "../error/service";

class WindowDimensions extends CachedElementVector<Dimensions2d> {
  protected static VectorClass: typeof Dimensions2d = Dimensions2d;

  constructor(element: HTMLElement = null) {
    super(element);
  }

  protected getValues(): number[] {
    return Dimensions2d.fromInnerWindow().getValues();
  }

  public static getForElement(use: any, args: any[]): WindowDimensions {
    if (args) {
      ErrorService.throw('WindowDimensions should not be used with elements');
    }
    // Ignore args.
    return <WindowDimensions>CachedElementVector.getForElement.bind(this)(use);
  }

  public static getSingleton(use: any): WindowDimensions {
    return <WindowDimensions>CachedElementVector.getSingleton.bind(this)(use);
  }
}

export {WindowDimensions};
