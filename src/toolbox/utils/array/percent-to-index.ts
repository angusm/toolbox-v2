import {NumericRange} from '../math/numeric-range';

/**
 * @param percent Number as decimal, i.e. .8 = 80%
 * @param values
 * @returns {number}
 */
function percentToIndex(percent: number, values: Array<any>): number {
  return Math.round(
    new NumericRange(0, values.length - 1).getPercentAsValue(percent));
}

export {percentToIndex};
