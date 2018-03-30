import {NumberOrString} from '../../types';

class Matrix {
  private a: number;
  private b: number;
  private c: number;
  private d: number;
  private tx: number;
  private ty: number;

  constructor(
    a: NumberOrString = 1,
    b: NumberOrString = 0,
    c: NumberOrString = 0,
    d: NumberOrString = 1,
    tx: NumberOrString = 0,
    ty: NumberOrString = 0
  ) {
    this.a = parseFloat(<string>a);
    this.b = parseFloat(<string>b);
    this.c = parseFloat(<string>c);
    this.d = parseFloat(<string>d);
    this.tx = parseFloat(<string>tx);
    this.ty = parseFloat(<string>ty);
  }

  public get translateX(): number {
    return this.tx;
  }

  public get translateY(): number {
    return this.ty;
  }

  public translate(vector: {x: number, y: number}): this {
    const newX = this.tx + vector.x;
    const newY = this.ty + vector.y;
    return new Matrix(this.a, this.b, this.c, this.d, newX, newY);
  }

  public setTranslateX(value: number): this {
    return new Matrix(this.a, this.b, this.c, this.d, value, this.ty);
  }

  public setTranslateY(value: number): this {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, value);
  }

  public static parseFromString(str: string): this {
    const valuesStr = str.split('matrix(').splice(-1)[0].split(')')[0];
    const values = valuesStr.split(',').map((str) => str.trim());
    if (!values.length || values[0] === 'none') {
      return new Matrix();
    } else {
      return new Matrix(...values);
    }
  }

  public static fromElementTransform(element: Element): this {
    return Matrix.parseFromString(
      window.getComputedStyle(element).transform);
  }

  public toCSSString(): string {
    const values = [this.a, this.b, this.c, this.d, this.tx, this.ty];
    return `matrix(${values.join(',')})`;
  }

  public applyToElementTransform(element: HTMLElement): void {
    element.style.transform = this.toCSSString();
  }
}

export {Matrix};
