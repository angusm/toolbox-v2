import {CachedElementVector} from './cached-element-vector';
import {Vector2d} from '../math/geometry/vector-2d';
import {getVisibleDistanceBetweenElements} from '../dom/position/get-visible-distance-between-elements';

class VisibleDistance extends CachedElementVector {
  private container_: HTMLElement;

  constructor(element: HTMLElement, container: HTMLElement = null) {
    super(element, container);
    this.container_ = container;
  }

  protected static getVectorClass(): typeof Vector2d {
    return Vector2d;
  }

  public getDistance(): Vector2d {
    return this.getCurrentVector<Vector2d>();
  }

  protected getValues(): number[] {
    return getVisibleDistanceBetweenElements(this.element, this.container_)
      .getValues();
  }
}

export {VisibleDistance};
