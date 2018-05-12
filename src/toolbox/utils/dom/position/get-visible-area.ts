import {getOpacity} from '../style/get-opacity';
import {isDisplayed} from "../style/is-displayed";
import {getVisibleDimensions} from "./get-visible-dimensions";
import {frameMemoize} from "../../frame-memoize";

function getVisibleArea_(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): number {
  if (!isDisplayed(target)) {
    return 0;
  }

  const opacityFactor: number = factorInOpacity ? getOpacity(target) : 1;
  return getVisibleDimensions(target, container).getArea() * opacityFactor;
}

const getVisibleArea = frameMemoize(getVisibleArea_);

export {getVisibleArea};
