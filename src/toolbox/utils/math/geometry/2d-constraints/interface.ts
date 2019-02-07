import {Vector2d} from "../vector-2d";

interface IConstraint2d {
  constrain(delta: Vector2d): Vector2d;
}

export {IConstraint2d};

