import {getCommonOffsetAncestor} from './get-common-offset-ancestor';
import {getOffsetFromAncestor_} from './get-offset-from-ancestor';
import {Vector2d} from "../../math/geometry/vector-2d";

function getOffsetBetweenElements(a: HTMLElement, b: HTMLElement): Vector2d {
  const commonAncestor: HTMLElement = getCommonOffsetAncestor(a, b);
  return getOffsetFromAncestor_(a, commonAncestor)
    .subtract(getOffsetFromAncestor_(b, commonAncestor));
}

export {getOffsetBetweenElements};
