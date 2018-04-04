import {Vector} from './vector';

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

  public static fromElementOffset<T extends Dimensions2d>(
    element: HTMLElement = null
  ): T {
    if (element) {
      return <T>new this(element.offsetWidth, element.offsetHeight);
    } else {
      return this.fromInnerWindow();
    }
  }

  public static fromInnerWindow<T extends Dimensions2d>() {
      return <T>new this(window.innerWidth, window.innerHeight);
  }

  public getArea(): number{
    return this.width * this.height;
  }
}

export {Dimensions2d};
