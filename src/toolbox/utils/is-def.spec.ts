import { isDef } from './is-def';
import { expect } from 'chai';
import 'mocha';
import {isDefined} from "./is-defined";

describe('isDef', () => {
  it(`should be a re-export of isDefined`, () => {
    expect(isDefined).to.equal(isDef);
  });
});
