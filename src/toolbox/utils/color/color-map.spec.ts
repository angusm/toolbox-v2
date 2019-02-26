import { ColorMap } from "./color-map";
import { expect } from "chai";
import "mocha";

describe("ColorMap", () => {
  const tests = [
    ["papayawhip", "#ffefd5"],
    ["peachpuff", "#ffdab9"],
    ["tomato", "#ff6347"],
    ["oldlace", "#fdf5e6"],
    ["mintcream", "#f5fffa"],
    ["lawngreen", "#7cfc00"],
    ["honeydew", "#f0fff0"],
    ["ghostwhite", "#f8f8ff"]
  ];
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} when
       mapped with ColorMap.get(${JSON.stringify(testInput)})`, () => {
      expect(ColorMap.get(testInput)).to.equal(expectedResult);
    });
  });
});
