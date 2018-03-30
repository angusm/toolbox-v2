import { BaseClass } from './base-class';
import { expect } from 'chai';
import 'mocha';

class A extends BaseClass {}
class B extends BaseClass {}
class C extends BaseClass {}

const tests = [
  [new A(), A],
  [new B(), B],
  [new C(), C],
];

describe('BaseClass.getClass()', () => {
  it(`should return the class of the instance and not its parent class`, () => {
    tests.forEach(([testInput, expectedResult]) => {
      expect(testInput.getClass()).to.equal(expectedResult);
    });
  });
});