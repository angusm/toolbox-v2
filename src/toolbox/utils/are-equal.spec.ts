import { areEqual } from './are-equal';
import { expect } from 'chai';
import 'mocha';

const testObject = {};
const tests = [
  [[], true],
  [[1, 1], true],
  [[1, '1'], false],
  [[1, 1, true], false],
  [[testObject, {}], false],
  [[testObject, testObject, testObject], true],
  [['ab', 'a' + 'b', 'a' + '' + 'b'], true],
  [[1], true],
  [[null, false], false],
  [[null, null], true],
];

describe('areEqual', () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
      expect(areEqual(...<Array<any>>testInput)).to.equal(expectedResult);
    });
  });
});
