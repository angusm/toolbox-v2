import { expect } from 'chai';
import 'mocha';
import { DynamicDefaultMap } from './dynamic-default';

const dynamicTests = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];

const tests = [
  [1, 2],
  [{}, 3],
  [{}, 4],
  [6, 7],
  ['a', 'b'],
  [null, 'boy howdy'],
];

describe('DynamicDefaultMap', () => {
  it('Should return values stored through the constructor', () => {
    const testMap = new DynamicDefaultMap(tests);
    tests.forEach(([testInput, expectedResult]) => {
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });

  it('Should return values stored through set()', () => {
    tests.forEach(([testInput, expectedResult]) => {
      const testMap = new DynamicDefaultMap();
      testMap.set(testInput, expectedResult);
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });

  it('Should create dynamic values', () => {
    const testMap = DynamicDefaultMap.usingFunction((v) => v + 1);
    dynamicTests.forEach(([testInput, expectedResult]) => {
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });
});
