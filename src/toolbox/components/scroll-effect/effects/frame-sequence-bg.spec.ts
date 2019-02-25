import { FrameSequenceBg } from "./frame-sequence-bg";
import { expect } from 'chai';
import 'mocha';

describe('FrameSequenceBg', () => {
  describe('generateFrameLoadOrder', () => {
    const tests: any[] = [
      [2, [0, 1]],
      [3, [0, 2, 1]],
      [4, [0, 3, 1, 2]],
      [5, [0, 4, 2, 1, 3]],
      [6, [0, 5, 2, 1, 3, 4]],
      [9, [0,8,4,2,6,1,5,3,7]],
      [10, [0,9,4,2,6,1,5,3,7,8]],
    ];
    tests.forEach(([testInput, expectedResult]) => {
      it(`should return ${JSON.stringify(expectedResult)} for ${JSON.stringify(testInput)}`, () => {
        const result = FrameSequenceBg.generateFrameLoadOrder(testInput);
        expect(result).to.have.ordered.members(expectedResult);
        expect(result.length).to.equal(expectedResult.length);
      });
    });
  });
});
