import {buildStringOfLength} from "./build-string-of-length";

function lpadUntilLength(
  valueToPad: string,
  lengthToPadTo: number,
  charactersToPadWith: string = ' '
): string {
  const missingLength = lengthToPadTo - valueToPad.length;
  if (missingLength > 0) {
    return `${buildStringOfLength(missingLength, charactersToPadWith)}` +
      `${valueToPad}`;
  } else {
    return valueToPad;
  }
}

export {lpadUntilLength};
