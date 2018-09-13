import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {isElementDominant} from "../position/is-element-dominant";

function isAnchorElementFromHashDominant(): boolean {
  const anchor = getAnchorElementFromHash();
  return anchor ? isElementDominant(<HTMLElement>anchor) : false;
}

export {isAnchorElementFromHashDominant};
