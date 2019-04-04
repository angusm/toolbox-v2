import { merge } from "./merge";
function union() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    return merge.apply(void 0, sets);
}
export { union };
//# sourceMappingURL=union.js.map