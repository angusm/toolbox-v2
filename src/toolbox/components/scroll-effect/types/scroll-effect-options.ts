import {IEffect} from "../effects/ieffect";
import {GetDistanceFn} from "./get-distance-fn";

type TScrollEffectDistanceValue = ((t?: HTMLElement) => number) | number;

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
