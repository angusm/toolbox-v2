import {Vector} from './vector';

class Dimensions2D extends Vector {
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

  public static fromElementOffset(element: HTMLElement): this {
    return new this[Symbol.species](element.offsetWidth, element.offsetHeight);
  }

  public getArea(): number{
    return this.width * this.height;
  }
}

export {Dimensions2D};
