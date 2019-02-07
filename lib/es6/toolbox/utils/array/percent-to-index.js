import { NumericRange } from '../math/numeric-range';
function percentToIndex(percent, values) {
    return Math.round(new NumericRange(0, values.length - 1).getPercentAsValue(percent));
}
export { percentToIndex };
//# sourceMappingURL=percent-to-index.js.map