import { Formula } from './formula';
import { expect } from 'chai';
import 'mocha';

describe('Formula', () => {
  describe('fromString', () => {
    const tests: any[] = [
      ['-3x', '-3x'],
      ['-2a + 4y', '-2a + 4y'],
      ['-2a+4y', '-2a + 4y'],
      ['-8d+ 2e', '-8d + 2e'],
      ['-5z +9y', '-5z + 9y'],
      ['3x', '3x'],
      ['2a - 4y', '2a - 4y'],
      ['2a-4y', '2a - 4y'],
      ['8d- 2e', '8d - 2e'],
      ['5z -9y', '5z - 9y'],
      ['a', '1a'],
      ['a + a', '2a'],
      ['a + a + a', '3a'],
      ['a + a - a + a', '2a'],
      ['-4.999999999999999% - 96px', '-4.999999999999999% - 96px'],
      ['-4.999999999999999% - 60px', '-4.999999999999999% - 60px'],
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
        expect(Formula.fromString(testInput).toString()).to.equal(expectedResult);
      });
    });
  });
});
