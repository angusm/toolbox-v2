"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbolString = void 0;
function getSymbolString(symbol) {
    var ending = symbol.toString().split('Symbol(').slice(1).join('Symbol(');
    return ending.split(')').slice(0, -1).join(')');
}
exports.getSymbolString = getSymbolString;
//# sourceMappingURL=get-symbol-string.js.map