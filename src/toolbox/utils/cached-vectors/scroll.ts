import {CachedElementVector} from './cached-element-vector';
import {Vector2d} from '../math/geometry/vector-2d';
import {getScrollElement} from "../dom/position/get-scroll-element";
import {Dimensions} from "./dimensions";
import {zip} from "../array/zip";
import {renderLoop} from "../render-loop";

class Scroll extends CachedElementVector<Vector2d> {
  protected static VectorClass: typeof Vector2d = Vector2d;

  constructor(element: HTMLElement = null) {
    super(element);
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
      return window.pageXOffset || getScrollElement().scrollLeft;
    }
  }

  private getScrollY_(): number {
    if (this.element) {
      return this.element.scrollTop;
    } else {
      return window.pageYOffset || getScrollElement().scrollTop;
    }
  }

  public getScrollPercent(): Vector2d {
    const scrollableDimensions: number[] =
      Dimensions.getForElement(getScrollElement())
        .getLastValue()
        .subtract(Dimensions.getForElement().getLastValue())
        .getValues();
    const scrollPositions: number[] = this.getValues();
    const zippedValues: number[][] = zip(scrollPositions, scrollableDimensions);
    return new Vector2d(
      ...zippedValues.map(([pos, len]: [number, number]) => pos / len));
  }

  public isScrollingDown(): boolean {
    return this.getDelta().y > 0;
  }

  public isScrollingUp(): boolean {
    return this.getDelta().y < 0;
  }

  public isScrollingRight(): boolean {
    return this.getDelta().x > 0;
  }

  public isScrollingLeft(): boolean {
    return this.getDelta().x < 0;
  }

  public static getForElement(...args: any[]): Scroll {
    return <Scroll>CachedElementVector.getForElement.bind(this)(...args);
  }

  public static getSingleton(): Scroll {
    return <Scroll>CachedElementVector.getSingleton.bind(this)();
  }

  protected renderLoopCleanup_(fn: () => void): void {
    renderLoop.scrollCleanup(fn);
  }

  protected renderLoopPremeasure_(fn: () => void): void {
    renderLoop.scrollPremeasure(fn);
  }
}

export {Scroll};
