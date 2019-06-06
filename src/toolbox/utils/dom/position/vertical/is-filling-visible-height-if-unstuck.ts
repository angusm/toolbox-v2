import {isDisplayed} from '../../style/is-displayed';
import {getVisibleHeightIfUnstuck} from "./get-visible-height-if-unstuck";
import {ROOT_ELEMENT} from "../root-element";

function isFillingVisibleHeightIfUnstuck(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isDisplayed(target) && (
    getVisibleHeightIfUnstuck(target, container) ===
    ROOT_ELEMENT.clientHeight);
}

export {isFillingVisibleHeightIfUnstuck};
