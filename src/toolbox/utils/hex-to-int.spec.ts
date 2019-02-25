import { hexToInt } from "./hex-to-int";
import { expect } from "chai";
import "mocha";

const tests = [
  ["FFFFFF", 16777215],
  ["000000", 0],
  ["F", 15],
  ["F0D34B2A7C231", 4236644637458993]
];

describe("hexToInt", () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(
      testInput
    )}`, () => {
      expect(hexToInt(<string>testInput)).to.equal(expectedResult);
    });
  });
});
