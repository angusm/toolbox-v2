import {IEffect} from "../effects/i-effect";
import {GetDistanceFn} from "./get-distance-fn";
import {TScrollEffectDistanceValue} from "./t-scroll-effect-distance-value";
import {TScrollEffectCallbackMap} from "./t-scroll-effect-callback-map";

/**
 * Interface for ScrollEffect configuration options.
 *
 * Useful to type re-usable default options in Typescript.
 *
 * For more information see the entry for ScrollEffect that outlines these
 * values.
 */
interface IScrollEffectOptions {
  condition?: () => boolean,
  distanceCallbacks?: TScrollEffectCallbackMap,
  percentCallbacks?: TScrollEffectCallbackMap,
  getDistanceFunction?: GetDistanceFn,
  startDistance?: TScrollEffectDistanceValue,
  endDistance?: TScrollEffectDistanceValue,
  effects?: Array<IEffect>,
}

export {IScrollEffectOptions};
