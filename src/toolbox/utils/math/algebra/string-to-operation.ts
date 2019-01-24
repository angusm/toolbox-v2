import {
  IOperation,
  Add,
  CloseParenthesis,
  Divide,
  Multiply, OpenParenthesis,
  Subtract
} from "./operation";

const stringToOperation =
  new Map<string, IOperation|symbol>([
    ['*', Multiply],
    ['/', Divide],
    ['+', Add],
    ['-', Subtract],
    ['(', OpenParenthesis],
    [')', CloseParenthesis],
  ]);

export {stringToOperation};
