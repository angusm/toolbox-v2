import { fill } from "./fill";
import { expect } from "chai";
import "mocha";
import { areArrayValuesEqual } from "./are-array-values-equal";

describe("fill", () => {
  const tests = [
    [[[255, 0, 0, 0], 1], [1, 1, 1, 1]],
    [[[0, 255, 0], 2], [2, 2, 2]],
    [[[0, 1], "A"], ["A", "A"]],
    [[[0, 255, 0, 0.25], null], [null, null, null, null]],
    [
      [[0, 255, 0, 0.25], undefined],
      [undefined, undefined, undefined, undefined]
    ]
  ];
  tests.forEach(([[testValues, testValue], expectedResult]) => {
    it(`should return ${JSON.stringify(
      expectedResult
    )} from fill(${JSON.stringify(testValues, testValue)})`, () => {
      expect(
        areArrayValuesEqual(fill(testValues, testValue), expectedResult)
      ).to.equal(true);
    });
  });
});
