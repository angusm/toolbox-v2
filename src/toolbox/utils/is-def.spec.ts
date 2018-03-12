import { isDef } from './is-def';
import { expect } from 'chai';
import 'mocha';

const tests = [
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

describe('isDef', () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
      expect(isDef(testInput)).to.equal(expectedResult);
    });
  });
});