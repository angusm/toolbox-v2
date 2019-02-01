import {IMeasurableInstance} from "../../../math/interfaces/measurable";

interface ICssStyleValueStatic<T> extends Function {
  new(...any: any[]): T;
  fromStyleString(value: string): T;
}

interface ICssStyleValueInstance {
  ['constructor']: ICssStyleValueStatic<ICssStyleValueInstance>
  toStyleString(): string;
}

export {
  ICssStyleValueStatic,
  ICssStyleValueInstance
};
