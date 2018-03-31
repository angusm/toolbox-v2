import {getCommonOffsetAncestor} from './get-common-offset-ancestor';
import {getOffsetFromAncestor} from './get-offset-from-ancestor';
import {Vector2d} from "../../math/geometry/vector-2d";

function getOffsetBetweenElements(a: HTMLElement, b: HTMLElement): Vector2d {
  const commonAncestor: HTMLElement = getCommonOffsetAncestor(a, b);
  return getOffsetFromAncestor(a, commonAncestor)
    .subtract(getOffsetFromAncestor(b, commonAncestor));
}

export {getOffsetBetweenElements};
