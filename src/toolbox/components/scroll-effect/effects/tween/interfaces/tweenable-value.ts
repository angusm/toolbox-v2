import {
  IMeasurableInstance,
  IMeasurableStatic
} from "../../../../../utils/math/interfaces/measurable";
import {
  ICssStyleValueInstance,
  ICssStyleValueStatic,
} from "../../../../../utils/dom/style/interfaces/css-style-value";

type ITweenableValueInstance = ICssStyleValueInstance & IMeasurableInstance;
type ITweenableValueStatic =
  IMeasurableStatic<ITweenableValueInstance> &
  ICssStyleValueStatic<ITweenableValueInstance>;


export {
  ITweenableValueStatic,
  ITweenableValueInstance
};
