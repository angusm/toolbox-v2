import { Variable } from './variable';
import { expect } from 'chai';
import 'mocha';

describe('Variable', () => {
  describe('fromString', () => {
    const tests: any[] = [
      ['5.9vh', '5.9vh'],
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
        expect(Variable.fromString(testInput).toString()).to.equal(expectedResult);
      });
    });
  });
});
