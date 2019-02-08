import {sum} from "../../math/sum";

function sumOffsetWidths(...els: HTMLElement[]): number {
  return sum(...els.map((el) => el.offsetWidth));
}

export {sumOffsetWidths};
