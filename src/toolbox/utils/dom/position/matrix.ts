import {Numeric} from '../../types';
import {Vector2d} from "../../math/geometry/vector-2d";

class Matrix {
  private a: number;
  private b: number;
  private c: number;
  private d: number;
  private tx: number;
  private ty: number;

  constructor(
    a: Numeric = 1,
    b: Numeric = 0,
    c: Numeric = 0,
    d: Numeric = 1,
    tx: Numeric = 0,
    ty: Numeric = 0
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

  public translate(vector: {x: number, y: number}): Matrix {
    const newX = this.tx + vector.x;
    const newY = this.ty + vector.y;
    return new Matrix(this.a, this.b, this.c, this.d, newX, newY);
  }

  public setTranslateX(value: number): Matrix {
    return new Matrix(this.a, this.b, this.c, this.d, value, this.ty);
  }

  public setTranslateY(value: number): Matrix {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, value);
  }

  public set2dTranslation(translation: Vector2d) {
    return new Matrix(
      this.a, this.b, this.c, this.d, translation.x, translation.y);
  }

  public setScale(scale: number) {
    return new Matrix(scale, this.b, this.c, scale, this.tx, this.ty);
  }

  public static parseFromString(str: string): Matrix {
    const valuesStr = str.split('matrix(').splice(-1)[0].split(')')[0];
    const values = valuesStr.split(',').map((str) => str.trim());
    if (!values.length || values[0] === 'none') {
      return new Matrix();
    } else {
      return new Matrix(...values);
    }
  }

  public static fromElementTransform(element: Element): Matrix {
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

  public applyToElementTransformAsChange(
    element: HTMLElement,
    originalMatrix: Matrix
  ) {
    Matrix.fromElementTransform(element)
      .applyDifference(this.getDifference(originalMatrix))
      .applyToElementTransform(element);
  }

  public applyDifference(differenceMatrix: Matrix) {
    return new Matrix(
      this.a + differenceMatrix.a,
      this.b + differenceMatrix.b,
      this.c + differenceMatrix.c,
      this.d + differenceMatrix.d,
      this.tx + differenceMatrix.tx,
      this.ty + differenceMatrix.ty
    );
  }

  public getDifference(matrix: Matrix) {
    return new Matrix(
      this.a - matrix.a,
      this.b - matrix.b,
      this.c - matrix.c,
      this.d - matrix.d,
      this.tx - matrix.tx,
      this.ty - matrix.ty
    );
  }
}

export {Matrix};
