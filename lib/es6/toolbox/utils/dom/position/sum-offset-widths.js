import { sum } from "../../math/sum";
function sumOffsetWidths() {
    var els = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        els[_i] = arguments[_i];
    }
    return sum.apply(void 0, els.map(function (el) { return el.offsetWidth; }));
}
export { sumOffsetWidths };
//# sourceMappingURL=sum-offset-widths.js.map