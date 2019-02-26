import { Color } from "./color";
import { expect } from "chai";
import "mocha";
import { areArrayValuesEqual } from "../array/are-array-values-equal";

describe("Color", () => {
  describe("constructor", () => {
    const tests = [
      [255, 0, 0, 0],
      [0, 255, 0, 0],
      [0, 255, 0, 1],
      [0, 255, 0, 0.25],
      [30, 25, 234, 0.25]
    ];
    tests.forEach(testValues => {
      it(`should return ${JSON.stringify(testValues)} from toNumbers when
         constructed with ${JSON.stringify(testValues)}`, () => {
        expect(
          areArrayValuesEqual(new Color(...testValues).toNumbers(), testValues)
        ).to.equal(true);
      });
    });
  });

  describe("fromStyleString (static)", () => {
    const tests = [
      ["red", [255, 0, 0, 1]],
      ["hotpink", [255, 105, 180, 1]],
      ["#ff69b4", [255, 105, 180, 1]],
      ["rgb(255,105,180)", [255, 105, 180, 1]],
      ["rgba(255,105,180,1)", [255, 105, 180, 1]],
      ["rgba(255,105,180,0.5)", [255, 105, 180, 0.5]],
      ["rgba(255,105,180,.5)", [255, 105, 180, 0.5]],
      ["#FFF", [255, 255, 255, 1]]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(expectedResult)} from toNumbers when
         constructed with Color.fromStyleString(${JSON.stringify(
           testInput
         )})`, () => {
        const result = Color.fromStyleString(<string>testInput).toNumbers();
        expect(result).to.have.ordered.members(<number[]>expectedResult);
        expect(result.length).to.equal((<number[]>expectedResult).length);
      });
    });
  });

  describe("fromHex", () => {
    const tests = [
      ["#FFFFFF", [255, 255, 255, 1]],
      ["#000000", [0, 0, 0, 1]],
      ["#812dd3", [129, 45, 211, 1]],
      ["#F2F", [255, 34, 255, 1]],
      ["FFFFFF", [255, 255, 255, 1]]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.fromHex(${JSON.stringify(testInput)})`, () => {
        const result = Color.fromHex(<string>testInput).toNumbers();
        expect(areArrayValuesEqual(result, <number[]>expectedResult)).to.equal(
          true
        );
      });
    });
  });

  describe("fromRgb", () => {
    const tests = [
      ["255, 255, 255", [255, 255, 255, 1]],
      ["0, 0, 0", [0, 0, 0, 1]],
      ["129, 45, 211", [129, 45, 211, 1]],
      ["255, 34, 255", [255, 34, 255, 1]]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.fromRgb(${JSON.stringify(testInput)})`, () => {
        const result = Color.fromRgb(<string>testInput).toNumbers();
        expect(areArrayValuesEqual(result, <number[]>expectedResult)).to.equal(
          true
        );
      });
    });
  });

  describe("isHexValue", () => {
    const tests = [
      ["#F2F2F2", true],
      ["#FFF", true],
      ["000000", true],
      ["FFF", true],
      ["cat", false]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.isHexValue(${JSON.stringify(testInput)})`, () => {
        expect(Color.isHexValue_(<string>testInput)).to.equal(expectedResult);
      });
    });
  });

  describe("getRGB", () => {
    const tests = [
      [[255, 255, 255, 1], [255, 255, 255]],
      [[0, 0, 0, 0], [0, 0, 0]],
      [[12, 234, 123, 0.4], [12, 234, 123]]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.getRGB(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const rgb = res.getRGB().toNumbers();
        expect(areArrayValuesEqual(rgb, expectedResult)).to.equal(true);
      });
    });
  });

  describe("getAlpha", () => {
    const tests = [
      [[255, 255, 255, 1], 1],
      [[0, 0, 0, 0], 0],
      [[12, 234, 123, 0.4], 0.4],
      [[0, 0, 0], 1]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.getAlpha(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const alpha = res.getAlpha();
        expect(alpha).to.equal(expectedResult);
      });
    });
  });

  describe("getRed", () => {
    const tests = [
      [[255, 255, 255, 1], 255],
      [[0, 0, 0, 0], 0],
      [[12, 234, 123, 0.4], 12],
      [[0, 0, 0], 0]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.getRed(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const red = res.getRed();
        expect(red).to.equal(expectedResult);
      });
    });
  });

  describe("getGreen", () => {
    const tests = [
      [[255, 255, 255, 1], 255],
      [[0, 0, 0, 0], 0],
      [[12, 234, 123, 0.4], 234],
      [[0, 0, 0], 0]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.getGreen(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const green = res.getGreen();
        expect(green).to.equal(expectedResult);
      });
    });
  });

  describe("getBlue", () => {
    const tests = [
      [[255, 255, 255, 1], 255],
      [[0, 0, 0, 0], 0],
      [[12, 234, 123, 0.4], 123],
      [[0, 0, 0], 0]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.getBlue(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const blue = res.getBlue();
        expect(blue).to.equal(expectedResult);
      });
    });
  });

  describe("toNumbers", () => {
    const tests = [
      [[255, 255, 255], [255, 255, 255, 1]],
      [[0, 0, 0, 0], [0, 0, 0, 0]],
      [[12, 234, 123, 0.4], [12, 234, 123, 0.4]],
      [[0, 0, 0], [0, 0, 0, 1]]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} with Color.toNumbers(${JSON.stringify(testInput)})`, () => {
        const res = new Color(...testInput);
        const numbers = res.toNumbers();
        expect(areArrayValuesEqual(numbers, expectedResult)).to.equal(true);
      });
    });
  });

  describe("fromNumbers", () => {
    const tests = [
      [[255, 255, 255]],
      [[0, 0, 0, 0]],
      [[12, 234, 123, 0.4]],
      [[0, 0, 0]]
    ];
    tests.forEach(([testInput]) => {
      it(`should return the same color with Color.fromNumbers(${JSON.stringify(
        testInput
      )})`, () => {
        const input = Color.fromNumbers(...testInput);
        const res = new Color(...testInput);
        expect(input).to.equal(res);
      });
    });
  });
});
