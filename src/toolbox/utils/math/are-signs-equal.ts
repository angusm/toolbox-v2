import {getSign} from "./get-sign";

function areSignsEqual(a: number, b: number): boolean {
  return getSign(a) === getSign(b);
}

export {areSignsEqual};
