import {IEffect} from "../effects/ieffect";
import {GetDistanceFn} from "./get-distance-fn";

/**
 * Type of function that returns a start or end distance for a Scroll Effect.
 *
 * Function receives the target HTMLElement and returns a number. May also be
 * a plain-old number for simplicity's sake.
 */
type TScrollEffectDistanceValue = ((t?: HTMLElement) => number) | number;

/**
 * Interface for ScrollEffect configuration options.
 *
 * Useful to type re-usable default options in Typescript.
 *
 * For more information see the entry for ScrollEffect that outlines these
 * values.
 */
interface IScrollEffectOptions {
  getDistanceFunction: GetDistanceFn,
  startDistance: TScrollEffectDistanceValue,
  endDistance: TScrollEffectDistanceValue,
  effects: Array<IEffect>,
}

export {
  IScrollEffectOptions,
  TScrollEffectDistanceValue
};
