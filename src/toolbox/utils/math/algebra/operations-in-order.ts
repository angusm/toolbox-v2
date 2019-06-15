import {Add, Divide, Multiply, IOperation, Subtract} from "./operation";

const operationsInOrder: IOperation[][] = [
  [Divide, Multiply],
  [Add, Subtract],
];

export {operationsInOrder};
