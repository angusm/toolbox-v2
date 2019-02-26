import { RGB } from "./rgb";
import { expect } from "chai";
import "mocha";
import { areArrayValuesEqual } from "../array/are-array-values-equal";

describe("RGB", () => {
  describe("constructor", () => {
    const tests = [
      [255, 0, 0],
      [0, 255, 0],
      [0, 255, 0],
      [0, 255, 0],
      [30, 25, 234]
    ];
    tests.forEach(testValues => {
      it(`should return ${JSON.stringify(testValues)} from toNumbers when
         constructed with ${JSON.stringify(testValues)}`, () => {
        expect(
          areArrayValuesEqual(new RGB(...testValues).toNumbers(), testValues)
        ).to.equal(true);
      });
    });
  });

  describe("getRed", () => {
    const tests = [
      [[255, 0, 0], 255],
      [[0, 255, 0], 0],
      [[12, 255, 0], 12],
      [[30, 25, 234], 30]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} from getRed(${JSON.stringify(testInput)})`, () => {
        const res = new RGB(...testInput);
        expect(res.getRed()).to.equal(expectedResult);
      });
    });
  });

  describe("getGreen", () => {
    const tests = [
      [[255, 0, 0], 0],
      [[0, 255, 0], 255],
      [[12, 12, 0], 12],
      [[4, 30, 234], 30]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} from getGreen(${JSON.stringify(testInput)})`, () => {
        const res = new RGB(...testInput);
        expect(res.getGreen()).to.equal(expectedResult);
      });
    });
  });

  describe("getBlue", () => {
    const tests = [
      [[255, 0, 0], 0],
      [[0, 255, 144], 144],
      [[12, 12, 234], 234],
      [[4, 30, 123], 123]
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(
        expectedResult
      )} from getBlue(${JSON.stringify(testInput)})`, () => {
        const res = new RGB(...testInput);
        expect(res.getBlue()).to.equal(expectedResult);
      });
    });
  });
});
