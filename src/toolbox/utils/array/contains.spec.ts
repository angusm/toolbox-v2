import { contains } from "./contains";
import { expect } from "chai";
import "mocha";

describe("contains", () => {
  const tests = [
    [[1, 2, 3], 2, true],
    [[2, 4, 6], 5, false],
    [["cat", "dog", "rabbit"], "dog", true],
    [["cat", "dog", "rabbit"], "goose", false]
  ];
  tests.forEach(([inputArray, containedElement, expectedResult]) => {
    it(`should return ${JSON.stringify(
      expectedResult
    )} from contains(${JSON.stringify(inputArray)})`, () => {
      expect(contains(inputArray, containedElement)).to.equal(expectedResult);
    });
  });
});
