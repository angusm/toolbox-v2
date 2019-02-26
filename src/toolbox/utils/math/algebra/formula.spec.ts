import { Formula } from './formula';
import { expect } from 'chai';
import 'mocha';

describe('Formula', () => {
  describe('fromString', () => {
    const tests: any[] = [
      ['-3x', '-3x'],
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
        expect(Formula.fromString(testInput).toString()).to.equal(expectedResult);
      });
    });
  });
});
