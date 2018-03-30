import {CachedElementVector} from './cached-element-vector';
import {Vector2d} from '../math/geometry/vector-2d';

class Scroll extends CachedElementVector {
  constructor(element: HTMLElement = null) {
    super(element);
  }

  protected static getVectorClass(): typeof Vector2d {
    return Vector2d;
  }

  public getPosition(): Vector2d {
    return this.getCurrentVector<Vector2d>();
  }

  protected getValues(): number[] {
    return [this.getScrollX_(), this.getScrollY_()];
  }

  private getScrollX_(): number {
    if (this.element) {
      return this.element.scrollLeft;
    } else {
      return window.pageXOffset ||
        document.body.scrollLeft ||
        document.documentElement.scrollLeft;
    }
  }

  private getScrollY_(): number {
    if (this.element) {
      return this.element.scrollTop;
    } else {
      return window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
    }
  }

  public isScrollingDown(): boolean {
    return this.getDelta<Vector2d>().y > 0;
  }

  public isScrollingUp(): boolean {
    return this.getDelta<Vector2d>().y < 0;
  }

  public isScrollingRight(): boolean {
    return this.getDelta<Vector2d>().x > 0;
  }

  public isScrollingLeft(): boolean {
    return this.getDelta<Vector2d>().x < 0;
  }
}

export {Scroll};
