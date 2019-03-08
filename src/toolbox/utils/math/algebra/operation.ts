import {Variable} from "./variable";

type OperationResult = [Variable]|[Variable, IOperation, Variable];

interface IOperation extends Function {
  new(): IOperationInstance;
  execute(a: Variable, b: Variable): OperationResult;
}

interface IOperationInstance {
  ['constructor']: IOperation
}

class Divide implements IOperationInstance {
  ['constructor']: typeof Divide; // For checking interface static methods
  public static execute(a: Variable, b: Variable): OperationResult {
    if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
      return [
        new Variable(a.numericValue / b.numericValue, a.symbol || b.symbol)];
    } else {
      return [a, Divide, b];
    }
  }
}

class Multiply implements IOperationInstance {
  ['constructor']: typeof Multiply; // For checking interface static methods
  public static execute(a: Variable, b: Variable): OperationResult {
    if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
      return [
        new Variable(a.numericValue * b.numericValue, a.symbol || b.symbol)];
    } else {
      return [a, Multiply, b];
    }
  }
}

class Add implements IOperationInstance {
  ['constructor']: typeof Add; // For checking interface static methods
  public static execute(a: Variable, b: Variable): OperationResult {
    if (a.symbol === b.symbol) {
      return [new Variable(a.numericValue + b.numericValue, a.symbol)];
    } else {
      return [a, Add, b];
    }
  }
}

class Subtract implements IOperationInstance {
  ['constructor']: typeof Subtract; // For checking interface static methods
  public static execute(a: Variable, b: Variable): OperationResult {
    if (a.symbol === b.symbol) {
      return [new Variable(a.numericValue - b.numericValue, a.symbol)];
    } else {
      return [a, Add, b.invert()];
    }
  }
}

const OpenParenthesis = Symbol('(');
const CloseParenthesis = Symbol(')');

const ALL_OPERATIONS: Set<IOperation|symbol> =
  new Set([
    Divide,
    Multiply,
    Add,
    Subtract,
    OpenParenthesis,
    CloseParenthesis
  ]);

export {
  ALL_OPERATIONS,
  IOperation,
  OperationResult,
  Divide,
  Multiply,
  Add,
  Subtract,
  OpenParenthesis,
  CloseParenthesis
};
