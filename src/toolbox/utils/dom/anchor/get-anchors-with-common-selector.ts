import {CommonSelector} from "../common-selector";

function getAnchorsWithCommonSelector(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll(CommonSelector.DEEP_LINK_TARGETS));
}

export {getAnchorsWithCommonSelector};
