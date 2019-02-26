import {TScrollEffectCallback} from "../types/t-scroll-effect-callback";

interface IEffect {
  run: TScrollEffectCallback,
  destroy(): void;
}

export {
  IEffect
};
