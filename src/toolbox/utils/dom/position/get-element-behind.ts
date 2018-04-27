import {frameMemoize} from '../../frame-memoize';
import {getVisibleArea} from "./get-visible-area";
import {max} from "../../array/max";

function getElementBehind_(
  target: HTMLElement, candidates: HTMLElement[]
): HTMLElement {
    return max(candidates, (candidate) => getVisibleArea(target, candidate));
}

const getElementBehind = frameMemoize(getElementBehind_);

export {getElementBehind};
