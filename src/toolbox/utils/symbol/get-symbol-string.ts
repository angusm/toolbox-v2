function getSymbolString(symbol: symbol): string {
  const ending: string =
    symbol.toString().split('Symbol(').slice(1).join('Symbol(');
  return ending.split(')').slice(0, -1).join(')');
}

export {getSymbolString};
