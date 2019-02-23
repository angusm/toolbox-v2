import { returnUntouched } from "./return-untouched";
import { expect } from "chai";
import "mocha";
import { areArrayValuesEqual } from "./array/are-array-values-equal";

const tests = [
  [54321, 54321],
  ["abc", "abc"],
  [true, true],
  [null, null],
  [undefined, undefined]
];

describe("returnUntouched", () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(
      testInput
    )}`, () => {
      expect(returnUntouched(testInput)).to.equal(expectedResult);
    });
  });
  it("should return identical arrays", () => {
    const array = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(areArrayValuesEqual(array, array2)).to.equal(true);
  });
  it("should return identical objects", () => {
    const obj = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(JSON.stringify(obj)).to.equal(JSON.stringify(obj2));
  });
});
