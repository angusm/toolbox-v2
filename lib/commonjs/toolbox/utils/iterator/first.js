"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function first(iterator, evaluationFn) {
    var done = false;
    while (!done) {
        var result = iterator.next();
        if (evaluationFn(result.value)) {
            return result.value;
        }
        done = result.done;
    }
    return undefined;
}
exports.first = first;
//# sourceMappingURL=first.js.map