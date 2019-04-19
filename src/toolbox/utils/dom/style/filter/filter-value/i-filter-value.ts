import {
  IMeasurableInstance,
  IMeasurableStatic
} from "../../../../math/interfaces/measurable";
import {
  ICssStyleValueInstance,
  ICssStyleValueStatic
} from "../../interfaces/css-style-value";

type IFilterSubInterface = IMeasurableInstance & ICssStyleValueInstance;
type IFilterStaticSubInterface = IMeasurableStatic & ICssStyleValueStatic;

interface IFilterValueStatic extends IFilterStaticSubInterface{
  valuesLength: number;
  getDefaultValue(): IFilterValueInstance;
}

interface IFilterValueInstance extends IFilterSubInterface {
  ['constructor']: IFilterValueStatic;
}

export {
  IFilterValueStatic,
  IFilterValueInstance
};
