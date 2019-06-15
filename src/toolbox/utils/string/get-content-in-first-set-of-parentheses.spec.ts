import { getContentInFirstSetOfParentheses } from './get-content-in-first-set-of-parentheses';
import { expect } from 'chai';
import 'mocha';

const tests: any[] = [
  ['calc(-30vh)', '-30vh'],
  ['calc(20px + 4vh - (7vw))', '20px + 4vh - (7vw)'],
  ['(a)(b)', 'a'],
  ['job', ''],
  ['34 + 87', ''],
  ['34 - 87', ''],
  ['((((9)))))', '(((9)))'],
];

describe('getContentInFirstSetOfParentheses', () => {
  tests.forEach(([testInput, expectedResult]) => {
    it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
      expect(getContentInFirstSetOfParentheses(testInput)).to.equal(expectedResult);
    });
  });
});
