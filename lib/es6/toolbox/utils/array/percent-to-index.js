import { Range } from '../math/range';
function percentToIndex(percent, values) {
    return Math.round(new Range(0, values.length - 1).getPercentAsValue(percent));
}
export { percentToIndex };
//# sourceMappingURL=percent-to-index.js.map