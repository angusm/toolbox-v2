import {ArrayMap} from "../../../utils/map/array";
import {TScrollEffectCallback} from "./t-scroll-effect-callback";
import {TScrollEffectCallbackCondition} from "./t-scroll-effect-callback-condition";


type TScrollEffectCallbackMap =
  ArrayMap<TScrollEffectCallbackCondition, TScrollEffectCallback> |
  [TScrollEffectCallbackCondition, TScrollEffectCallback[]][]

export {TScrollEffectCallbackMap};
