import {Vector} from './vector';
import {areArrayValuesEqual} from "../../array/are-array-values-equal";
import {SCROLL_ELEMENT} from "../../dom/position/scroll-element";
import {ROOT_ELEMENT} from "../../dom/position/root-element";

class Dimensions2d extends Vector {
  constructor(width: number = 0, height: number = 0, ...args: number[]) {
    super(width, height, ...args);
  }

  public get width(): number {
    return this.getValues()[0];
  }

  public get height(): number {
    return this.getValues()[1];
  }

  public sizeElement(element: HTMLElement): void {
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
  }

  public static fromCanvas<T extends Dimensions2d>(
    element: HTMLCanvasElement = null
  ): T {
    return <T>new this(element.width, element.height);
  }

  public static fromVideo<T extends Dimensions2d>(
    element: HTMLVideoElement = null
  ): T {
    return <T>new this(element.videoWidth, element.videoHeight);
  }

  public static fromElementOffset<T extends Dimensions2d>(
    element: HTMLElement = null
  ): T {
    if (element) {
      return <T>new this(element.offsetWidth, element.offsetHeight);
    } else {
      return this.fromInnerWindow();
    }
  }

  public static fromRootElement<T extends Dimensions2d>() {
    return <T>new this(ROOT_ELEMENT.clientWidth, ROOT_ELEMENT.clientHeight);
  }

  public static fromScrollElementClient<T extends Dimensions2d>() {
    return <T>new this(SCROLL_ELEMENT.clientWidth, SCROLL_ELEMENT.clientHeight);
  }

  public static fromInnerWindow<T extends Dimensions2d>() {
      return <T>new this(window.innerWidth, window.innerHeight);
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public equals(dimensions: Dimensions2d): boolean {
    return areArrayValuesEqual(this.getValues(), dimensions.getValues());
  }
}

export {Dimensions2d};
