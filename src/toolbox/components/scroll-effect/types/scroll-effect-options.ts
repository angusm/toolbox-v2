import {IEffect} from "../effects/ieffect";

interface IScrollEffectOptions {
  getDistanceFunction: (a: HTMLElement, b?: HTMLElement) => number,
  startDistance: number,
  endDistance: number,
  effects: Array<IEffect>,
}

export {IScrollEffectOptions};
