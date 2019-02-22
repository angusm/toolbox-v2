import { returnUntouched } from "./return-untouched";
import { expect } from "chai";
import "mocha";

const tests = [[54321, 54321], ["abc", "abc"]];

describe("returnUntouched", () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(
      testInput
    )}`, () => {
      expect(returnUntouched(testInput)).to.equal(expectedResult);
    });
  });
});
