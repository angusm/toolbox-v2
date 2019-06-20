import {isDisplayed} from '../../style/is-displayed';
import {getVisibleHeightIgnoringSticky} from "./get-visible-height-ignoring-sticky";
import {ROOT_ELEMENT} from "../root-element";

function isFillingVisibleHeightIgnoringSticky(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isDisplayed(target) && (
    getVisibleHeightIgnoringSticky(target, container) ===
    ROOT_ELEMENT.clientHeight);
}

export {isFillingVisibleHeightIgnoringSticky};
