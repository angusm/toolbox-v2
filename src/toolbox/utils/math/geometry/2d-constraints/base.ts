import {Vector2d} from "../vector-2d";
import {IConstraint2d} from "./interface";
import {NumericRange} from "../../numeric-range";

class Constraint2d implements IConstraint2d{
  private readonly xRange_: NumericRange;
  private readonly yRange_: NumericRange;

  constructor(xRange: NumericRange, yRange: NumericRange) {
    this.xRange_ = xRange;
    this.yRange_ = yRange;
  }

  constrain(delta: Vector2d) {
    return new Vector2d(
      this.xRange_.clamp(delta.x),
      this.yRange_.clamp(delta.y));
  }

  static applyConstraints(delta: Vector2d, constraints: IConstraint2d[]) {
    return constraints.reduce(
      (result, constraint) => constraint.constrain(result), delta);
  }
}

export {Constraint2d};
