import {getSign} from "../math/get-sign";
import {wrapIndex} from "./wrap-index";

function loopSlice<T>(
  values: T[], startIndex: number, rawEndIndex: number, direction: number
): T[] {
  const result: T[] = [];
  const length = values.length;
  const increment = getSign(direction);
  const endIndex = wrapIndex(rawEndIndex, length);
  let index = wrapIndex(startIndex, length);
  while (index !== endIndex) {
    result.push(values[index]);
    index = wrapIndex(index + increment, length);
  }

  return result;
}

export {loopSlice};
