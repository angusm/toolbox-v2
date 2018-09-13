import {getOpacity} from '../style/get-opacity';
import {isDisplayed} from "../style/is-displayed";
import {getVisibleDimensions} from "./get-visible-dimensions";
import {isVisible} from "../style/is-visible";

function getVisibleArea(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): number {
  if (!isDisplayed(target) || !isVisible(target)) {
    return 0;
  }

  const opacityFactor: number = factorInOpacity ? getOpacity(target) : 1;
  return getVisibleDimensions(target, container).getArea() * opacityFactor;
}

export {getVisibleArea};
