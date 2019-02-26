import { areArrayValuesEqual } from "./are-array-values-equal";
import { expect } from "chai";
import "mocha";

describe("areArrayValuesEqual", () => {
  const tests = [
    [[[255, 0, 0, 0], [255, 0, 0, 0]], true],
    [[[0, 255, 0, 0], [0, 255, 0, 1]], false],
    [[[0, 255, 0, 1], [0, 255, 0, 0]], false],
    [[[0, 255, 0, 0.25], [0, 255, 0, 0.25]], true],
    [[[30, 25, 234, 0.25], [0, 255, 0, 0.25]], false]
  ];
  tests.forEach(([testValues, expectedResult]) => {
    it(`should return ${JSON.stringify(
      expectedResult
    )} from areArrayValuesEqual(${JSON.stringify(testValues)})`, () => {
      expect(areArrayValuesEqual(...testValues)).to.equal(expectedResult);
    });
  });
});
