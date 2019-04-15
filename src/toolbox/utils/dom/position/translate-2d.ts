import {Vector2d} from "../../math/geometry/vector-2d";
import {MatrixService} from "./matrix-service";

function translate2d(element: HTMLElement, vector: Vector2d): void {
  MatrixService.getSingleton().translate(element, vector);
}

export {translate2d};
