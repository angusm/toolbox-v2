import {
  IOperation,
  Add,
  Divide,
  Multiply,
  Subtract
} from "./operation";

const stringToOperation =
  new Map<string, IOperation>([
    ['*', Multiply],
    ['/', Divide],
    ['+', Add],
    ['-', Subtract],
  ]);

export {stringToOperation};
