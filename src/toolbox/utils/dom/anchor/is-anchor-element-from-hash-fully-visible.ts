import {isFullyVisible} from "../position/is-fully-visible";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";

function isAnchorElementFromHashFullyVisible(): boolean {
  return getAnchorElementFromHash() ?
    isFullyVisible(getAnchorElementFromHash()) : false;
}

export {isAnchorElementFromHashFullyVisible};
