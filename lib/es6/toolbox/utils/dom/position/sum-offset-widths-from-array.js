import { sum } from "../../math/sum";
function sumOffsetWidthsFromArray(els) {
    return sum.apply(void 0, els.map(function (el) { return el.offsetWidth; }));
}
export { sumOffsetWidthsFromArray };
//# sourceMappingURL=sum-offset-widths-from-array.js.map