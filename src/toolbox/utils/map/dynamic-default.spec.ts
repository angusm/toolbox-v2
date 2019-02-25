import { expect } from 'chai';
import 'mocha';
import { DynamicDefaultMap } from './dynamic-default';

const tests: [any, any][] = [
  [1, 2],
  [{}, 3],
  [{}, 4],
  [6, 7],
  ['a', 'b'],
  [null, 'boy howdy'],
];

describe('DynamicDefaultMap', () => {
  it('Should return values stored through the constructor', () => {
    const testMap = new DynamicDefaultMap<any, any>(tests);
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
    const dynamicTests: [number, number][] = [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ];
    const testMap = DynamicDefaultMap.usingFunction((v:number) => v + 1);
    dynamicTests.forEach(([testInput, expectedResult]) => {
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });
});
