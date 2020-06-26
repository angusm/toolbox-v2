import {CachedElementVector} from './cached-element-vector';
import {Vector2d} from '../math/geometry/vector-2d';
import {Dimensions} from "./dimensions";
import {zip} from "../array/zip";
import {renderLoop} from "../render-loop";
import {SCROLL_ELEMENT} from "../dom/position/scroll-element";

class Scroll extends CachedElementVector<Vector2d> {
  protected static VectorClass: typeof Vector2d = Vector2d;
  private rootElementDimensions_: Dimensions;
  private scrollElementDimensions_: Dimensions;

  constructor(element: HTMLElement = null) {
    super(element);
    this.rootElementDimensions_ = Dimensions.getSingleton(this);
    this.scrollElementDimensions_ =
        Dimensions.getForElement(this, [SCROLL_ELEMENT]);
  }

  public getPosition(): Vector2d {
    return this.getLastValue();
  }

  protected getValues(): number[] {
    return [this.getScrollX_(), this.getScrollY_()];
  }

  private getScrollX_(): number {
    if (this.element) {
      return this.element.scrollLeft;
    } else {
      return window.pageXOffset || SCROLL_ELEMENT.scrollLeft;
    }
  }

  private getScrollY_(): number {
    if (this.element) {
      return this.element.scrollTop;
    } else {
      return window.pageYOffset || SCROLL_ELEMENT.scrollTop;
    }
  }

  public getScrollPercent(): Vector2d {
    const scrollableDimensions: number[] =
      this.scrollElementDimensions_
        .getLastValue()
        .subtract(this.rootElementDimensions_.getLastValue())
        .getValues();
    const scrollPositions: number[] = this.getValues();
    const zippedValues: number[][] = zip(scrollPositions, scrollableDimensions);
    return new Vector2d(
      ...zippedValues.map(([pos, len]: [number, number]) => pos / len));
  }

  public isScrollingDown(): boolean {
    return this.getDelta().y < 0;
  }

  public isScrollingUp(): boolean {
    return this.getDelta().y > 0;
  }

  public isScrollingRight(): boolean {
    return this.getDelta().x > 0;
  }

  public isScrollingLeft(): boolean {
    return this.getDelta().x < 0;
  }

  public static getForElement(use: any, args: any[] = [null]): Scroll {
    return <Scroll>CachedElementVector.getForElement.bind(this)(use, args);
  }

  public static getSingleton(use: any): Scroll {
    return <Scroll>CachedElementVector.getSingleton.bind(this)(use);
  }

  protected renderLoopCleanup_(fn: () => void): void {
    renderLoop.scrollCleanup(fn);
  }

  protected renderLoopPremeasure_(fn: () => void): void {
    renderLoop.scrollPremeasure(fn);
  }

  public destroy(use: any) {
    super.destroy(use);
    this.rootElementDimensions_.destroy(this);
    this.scrollElementDimensions_.destroy(this);
  }
}

export {Scroll};
