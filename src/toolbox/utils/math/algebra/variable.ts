const algebraRegex = /^\-?((([0-9]*\.?[0-9]+)([a-zA-Z\%]*))|([a-zA-Z\%]+))$/;

type VariableSymbol = string|null;

class Variable {
  readonly numericValue: number;
  readonly symbol: string;

  constructor(numericValue: number, symbol: VariableSymbol) {
    this.numericValue = numericValue;
    this.symbol = symbol;
  }

  public isNumber(): boolean {
    return this.symbol === null;
  }

  public isVariable(): boolean {
    return !this.isNumber();
  }

  public static fromString(s: string): Variable {
    const matches = algebraRegex.exec(s);
    if (matches === null) {
      throw new Error(`Invalid variable value in "${s}"`);
    }
    const sign = s[0] === '-' ? -1 : 1;
    const numericValue = matches[3] ? parseFloat(matches[3]) : 1;
    const symbol = matches[4] || matches[5] || null;
    return new Variable(sign * numericValue, symbol);
  }

  public toString(): string {
    const symbolString = this.symbol === null ? '' : this.symbol;
    return `${this.numericValue}${symbolString}`;
  }

  public invert(): Variable {
    return new Variable(-this.numericValue, this.symbol);
  }
}

export {Variable, VariableSymbol};
