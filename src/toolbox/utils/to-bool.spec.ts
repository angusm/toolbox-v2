import { toBool } from "./to-bool";
import { expect } from "chai";
import "mocha";

const tests = [
  [1, true],
  [{}, true],
  [[], true],
  ["asdf", true],
  [null, false],
  [undefined, false],
  [0, false]
];

describe("toBool", () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(
      testInput
    )}`, () => {
      expect(toBool(testInput)).to.equal(expectedResult);
    });
  });
});
