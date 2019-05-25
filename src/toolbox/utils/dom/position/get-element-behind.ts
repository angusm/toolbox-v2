import {getVisibleArea} from "./get-visible-area";
import {max} from "../../array/max";

// TODO(Angus): POORLY NAMED. FIND A BETTER NAME.
function getElementBehind(
  target: HTMLElement, candidates: HTMLElement[]
): HTMLElement {
    return max(candidates, (candidate) => getVisibleArea(target, candidate));
}

export {getElementBehind};
