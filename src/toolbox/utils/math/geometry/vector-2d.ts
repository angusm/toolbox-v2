import {Matrix} from '../../dom/position/matrix';
import {Vector} from './vector';
import {browserHasChrome64TableDisplayOffsetIssues} from '../../dom/style/browser-has-chrome64-table-display-offset-issues';
import {isTableDisplayed} from '../../dom/style/is-table-displayed';
import HTML = Mocha.reporters.HTML;

class Vector2d extends Vector {
  constructor(x: number = 0, y: number = 0, ...args: number[]) {
    super(x, y, ...args);
  }

  public get x(): number {
    return this.getValues()[0];
  }

  public get y(): number {
    return this.getValues()[1];
  }

  public static fromElementOffset(element: HTMLElement): this {
    const offsetParent: HTMLElement = <HTMLElement>element.offsetParent;
    if (
      offsetParent && isTableDisplayed(offsetParent) &&
      browserHasChrome64TableDisplayOffsetIssues()
    ) {
      return new this[Symbol.species](
        element.offsetLeft - offsetParent.offsetLeft,
        element.offsetTop - offsetParent.offsetTop);
    } else {
      return new this[Symbol.species](element.offsetLeft, element.offsetTop);
    }
  }

  public static fromMatrix(matrix: Matrix): this{
    return new this[Symbol.species](matrix.translateX, matrix.translateY);
  }

  public static fromElementScroll(element: Element): this {
    return new this[Symbol.species](element.scrollLeft, element.scrollTop);
  }

  public static fromElementTransform(element: Element): this {
    return this[Symbol.species]
      .fromMatrix(Matrix.fromElementTransform(element));
  }

  public positionElement(element: HTMLElement): void {
    element.style.left = `${this.x}px`;
    element.style.top = `${this.y}px`;
  }

  public positionElementByTranslation(element: HTMLElement): void {
    element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  public toString(): string {
    return `X: ${this.x}, Y: ${this.y}`;
  }
}

export {Vector2d};