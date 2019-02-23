import { returnUntouched } from "./return-untouched";
import { expect } from "chai";
import "mocha";
import { areArrayValuesEqual } from "./array/are-array-values-equal";

const testArray = [1, 2, 3];
const testObj = { a: 1, b: 2 };

const tests = [
  [54321, 54321],
  ["abc", "abc"],
  [true, true],
  [null, null],
  [undefined, undefined],
  [testArray, testArray],
  [testObj, testObj]
];

describe("returnUntouched", () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(
      testInput
    )}`, () => {
      expect(returnUntouched(testInput)).to.equal(expectedResult);
    });
  });
});
