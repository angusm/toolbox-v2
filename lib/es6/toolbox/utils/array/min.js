import { max } from './max';
function min(values, scoreFn) {
    return max(values, function (value) { return -scoreFn(value); });
}
export { min };
//# sourceMappingURL=min.js.map