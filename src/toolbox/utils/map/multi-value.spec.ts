import { expect } from 'chai';
import 'mocha';
import { MultiValueMap } from './multi-value';

const testObject = {};
const testObject2 = {};
const tests: [any[], any][] = [
  [['a'], 1],
  [['a', 'b'], 2],
  [['a', 'c'], 3],
  [[1, 2, 3, 4], 7],
  [[testObject], 9],
  [[testObject2], 10],
];

describe('MultiValueMap', () => {
  it('Should return values stored through the constructor', () => {
    const testMap = new MultiValueMap(tests);
    tests.forEach(([testInput, expectedResult]) => {
      // expect(testMap.getInternalKey(testInput)).to.equal(expectedResult);
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });

  it('Should return values stored through set()', () => {
    tests.forEach(([testInput, expectedResult]) => {
      const testMap = new MultiValueMap();
      testMap.set(testInput, expectedResult);
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });
});
