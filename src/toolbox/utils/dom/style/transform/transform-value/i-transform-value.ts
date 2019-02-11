import {
  IMeasurableInstance,
  IMeasurableStatic
} from "../../../../math/interfaces/measurable";
import {
  ICssStyleValueInstance,
  ICssStyleValueStatic
} from "../../interfaces/css-style-value";

type ITransformSubInterface = IMeasurableInstance & ICssStyleValueInstance;
type ITransformStaticSubInterface = IMeasurableStatic & ICssStyleValueStatic;

interface ITransformValueStatic extends ITransformStaticSubInterface{
  valuesLength: number;
  getDefaultValue(): ITransformValueInstance;
}

interface ITransformValueInstance extends ITransformSubInterface {
  ['constructor']: ITransformValueStatic;
}

export {
  ITransformValueStatic,
  ITransformValueInstance
};
