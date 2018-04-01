import { max } from './max';
function min(iterable, scoreFn) {
    return max(iterable, function (value) { return -scoreFn(value); });
}
export { min };
//# sourceMappingURL=min.js.map