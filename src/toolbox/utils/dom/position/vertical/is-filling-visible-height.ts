import {isDisplayed} from '../../style/is-displayed';
import {getVisibleHeight} from "./get-visible-height";
import {ROOT_ELEMENT} from "../root-element";

function isFillingVisibleHeight(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isDisplayed(target) &&
    getVisibleHeight(target, container) === ROOT_ELEMENT.clientHeight;
}

export {isFillingVisibleHeight};
