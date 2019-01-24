import { Add, CloseParenthesis, Divide, Multiply, OpenParenthesis, Subtract } from "./operation";
var stringToOperation = new Map([
    ['*', Multiply],
    ['/', Divide],
    ['+', Add],
    ['-', Subtract],
    ['(', OpenParenthesis],
    [')', CloseParenthesis],
]);
export { stringToOperation };
//# sourceMappingURL=string-to-operation.js.map