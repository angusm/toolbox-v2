import { Color } from './color';
import { expect } from 'chai';
import 'mocha';
import {areArrayValuesEqual} from "../array/are-array-values-equal";

describe('Color', () => {
  describe('constructor', () => {
    const tests = [
      [255,0,0,0],
      [0,255,0,0],
      [0,255,0,1],
      [0,255,0,.25],
      [30,25,234,.25],
    ];
    tests.forEach((testValues) => {
      it(
        `should return ${JSON.stringify(testValues)} from toNumbers when
         constructed with ${JSON.stringify(testValues)}`,
        () => {
          expect(
            areArrayValuesEqual(
              new Color(...testValues).toNumbers(), testValues)
          ).to.equal(true);
        }
      );
    });
  });

  describe('fromStyleString (static)', () => {
    const tests = [
      ['red', [255,0,0,1]],
      ['hotpink', [255,105,180,1]],
      ['#ff69b4', [255,105,180,1]],
      ['rgb(255,105,180)', [255,105,180,1]],
      ['rgba(255,105,180,1)', [255,105,180,1]],
      ['rgba(255,105,180,0.5)', [255,105,180,.5]],
      ['rgba(255,105,180,.5)', [255,105,180,.5]],
      ['#FFF', [255,255,255,1]],
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(
        `should return ${JSON.stringify(expectedResult)} from toNumbers when
         constructed with Color.fromStyleString(${JSON.stringify(testInput)})`,
        () => {
          const result = Color.fromStyleString(<string>testInput).toNumbers();
          expect(result).to.have.ordered.members(<number[]>expectedResult);
          expect(result.length).to.equal((<number[]>expectedResult).length)
        }
      );
    });
  });
});
