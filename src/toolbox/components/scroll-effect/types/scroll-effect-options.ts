import {IEffect} from "../effects/ieffect";
import {GetDistanceFn} from "./get-distance-fn";

interface IScrollEffectOptions {
  getDistanceFunction: GetDistanceFn,
  startDistance: number,
  endDistance: number,
  effects: Array<IEffect>,
}

export {IScrollEffectOptions};
