import { expect } from 'chai';
import 'mocha';
import { MapWrapper } from './map-wrapper';

const tests = [
  [1, 2],
  [{}, 3],
  [{}, 4],
  [6, 7],
  ['a', 'b'],
  [null, 'boy howdy'],
];

describe('MapWrapper', () => {
  it('Should return values stored through the constructor', () => {
    const testMap = new MapWrapper(tests);
    tests.forEach(([testInput, expectedResult]) => {
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });

  it('Should return values stored through set()', () => {
    tests.forEach(([testInput, expectedResult]) => {
      const testMap = new MapWrapper();
      testMap.set(testInput, expectedResult);
      expect(testMap.get(testInput)).to.equal(expectedResult);
    });
  });
});
