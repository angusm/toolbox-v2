import {sum} from "./sum";

function average(...values: number[]): number {
  return sum(...values) / values.length;
}

export {average};
