function getSymbolString(symbol) {
    var ending = symbol.toString().split('Symbol(').slice(1).join('Symbol(');
    return ending.split(')').slice(0, -1).join(')');
}
export { getSymbolString };
//# sourceMappingURL=get-symbol-string.js.map