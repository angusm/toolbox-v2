import { isDefined } from './is-defined';
import { expect } from 'chai';
import 'mocha';

const tests: any[] = [
  [1, true],
  [0, true],
  [-1, true],
  [false, true],
  [true, true],
  [null, true],
  [{}, true],
  [[], true],
  ['undefined', true],
  ['false', true],
  [Symbol(undefined), true],
  [undefined, false],
];

describe('isDefined', () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
      expect(isDefined(testInput)).to.equal(expectedResult);
    });
  });
});
