import {Matrix} from '../../dom/position/matrix';
import {Vector} from './vector';
import {browserHasChrome64TableDisplayOffsetIssues} from '../../dom/style/browser-has-chrome64-table-display-offset-issues';
import {isTableDisplayed} from '../../dom/style/is-table-displayed';

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

  public static fromElementOffset<T extends Vector2d>(element: HTMLElement): T {
    const offsetParent: HTMLElement = <HTMLElement>element.offsetParent;
    if (
      offsetParent && isTableDisplayed(offsetParent) &&
      browserHasChrome64TableDisplayOffsetIssues()
    ) {
      return <T>new this(
        element.offsetLeft - offsetParent.offsetLeft,
        element.offsetTop - offsetParent.offsetTop);
    } else {
      return <T>new this(element.offsetLeft, element.offsetTop);
    }
  }

  public static fromMatrix<T extends Vector2d>(matrix: Matrix): T{
    return <T>new this(matrix.translateX, matrix.translateY);
  }

  public static fromElementScroll<T extends Vector2d>(element: Element): T {
    return <T>new this(element.scrollLeft, element.scrollTop);
  }

  public static fromElementTransform<T extends Vector2d>(element: Element): T {
    return this.fromMatrix(Matrix.fromElementTransform(element));
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
