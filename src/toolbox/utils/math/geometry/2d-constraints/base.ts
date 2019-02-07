import {Vector2d} from "../vector-2d";
import {IConstraint2d} from "./interface";

class Constraint2d implements IConstraint2d{
  constrain(delta: Vector2d) {
    console.warn('constrain() is not overridden from base case');
    return delta;
  }

  static applyConstraints(delta: Vector2d, ...constraints: IConstraint2d[]) {
    return constraints.reduce(
      (result, constraint) => constraint.constrain(result), delta);
  }
}

export {Constraint2d};
