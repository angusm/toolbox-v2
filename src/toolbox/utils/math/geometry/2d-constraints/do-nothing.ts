import {Vector2d} from "../vector-2d";
import {IConstraint2d} from "./interface";

class DoNothingConstraint implements IConstraint2d{
  constrain(delta: Vector2d) {
    return delta;
  }
}

const DO_NOTHING_CONSTRAINT = new DoNothingConstraint();

export {DO_NOTHING_CONSTRAINT};
