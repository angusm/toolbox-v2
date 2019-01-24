import { sum } from "./sum";
function average() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return sum.apply(void 0, values) / values.length;
}
export { average };
//# sourceMappingURL=average.js.map