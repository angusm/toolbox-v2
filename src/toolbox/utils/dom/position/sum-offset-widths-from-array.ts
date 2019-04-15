
import {sum} from "../../math/sum";

function sumOffsetWidthsFromArray(els: HTMLElement[]): number {
  return sum(...els.map((el) => el.offsetWidth));
}

export {sumOffsetWidthsFromArray};
