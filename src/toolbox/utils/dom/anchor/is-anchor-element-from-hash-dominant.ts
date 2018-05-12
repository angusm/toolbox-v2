import {isFullyVisible} from "../position/is-fully-visible";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {isFillingVisibleArea} from "../position/is-filling-visible-area";

function isAnchorElementFromHashDominant(): boolean {
  return getAnchorElementFromHash() ?
    isFullyVisible(getAnchorElementFromHash()) ||
    isFillingVisibleArea(getAnchorElementFromHash()) :
    false;
}

export {isAnchorElementFromHashDominant};
