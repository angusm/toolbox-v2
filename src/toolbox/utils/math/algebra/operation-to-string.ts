import {IOperation} from "./operation";
import {stringToOperation} from "./string-to-operation";
import {reverseMap} from "../../map/reverse-map";

const operationToString: Map<IOperation|symbol, string> =
  reverseMap<string, IOperation|symbol>(stringToOperation);

export {operationToString};
