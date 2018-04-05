import {CachedElementVector} from './cached-element-vector';
import {Vector2d} from '../math/geometry/vector-2d';
import {getVisibleDistanceBetweenElements} from '../dom/position/get-visible-distance-between-elements';

class VisibleDistance extends CachedElementVector<Vector2d> {
  protected static VectorClass: typeof Vector2d = Vector2d;
  private container_: HTMLElement;

  constructor(element: HTMLElement, container: HTMLElement = null) {
    super(element, container);
    this.container_ = container;
  }

  public getDistance(): Vector2d {
    return this.getLastValue();
  }

  protected getValues(): number[] {
    return getVisibleDistanceBetweenElements(this.element, this.container_)
      .getValues();
  }

  public static getForElement(...args: any[]): VisibleDistance {
    return <VisibleDistance>CachedElementVector.getForElement(...args);
  }

  public static getSingleton(): VisibleDistance {
    return <VisibleDistance>CachedElementVector.getSingleton();
  }
}

export {VisibleDistance};
