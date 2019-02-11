import {IEffect} from "../ieffect";
import {renderLoop} from "../../../../utils/render-loop";
import {setStyle} from "../../../../utils/dom/style/set-style";
import {Animation} from "./animation";
import {KeyframeStyle} from "./keyframe-style";
import {TKeyframesConfig} from "./keyframes-config";
import {ITweenOptions} from "./interfaces/tween-options";

const defaultOptions: ITweenOptions = {
  keyframeStyle: KeyframeStyle.PERCENT,
  styleTarget: null,
};

class Tween implements IEffect {
  readonly animation_: Animation;
  readonly keyframeStyle_: KeyframeStyle;
  readonly styleTarget_: HTMLElement;

  constructor(
    keyframes: TKeyframesConfig,
    {
      keyframeStyle = defaultOptions.keyframeStyle,
      styleTarget = defaultOptions.styleTarget,
    }: ITweenOptions = defaultOptions
  ) {
    this.animation_ = Animation.fromKeyframesConfig(keyframes);
    this.keyframeStyle_ = keyframeStyle;
    this.styleTarget_ = styleTarget;
  }

  private getDistance_(
    distanceAsPx: number,
    distanceAsPercent: number
  ): number {
    if (this.keyframeStyle_ === KeyframeStyle.PERCENT) {
      return distanceAsPercent;
    } else {
      return distanceAsPx;
    }
  }

  public run(
    target: HTMLElement,
    distanceAsPx: number,
    distanceAsPercent: number
  ): void {
    const distance = this.getDistance_(distanceAsPx, distanceAsPercent);
    const propertyValueMap =
      this.animation_.getPropertyValueMapFromPosition(distance);
    const styleTarget = this.styleTarget_ === null ? target : this.styleTarget_;

    renderLoop.mutate(() => {
      Array.from(propertyValueMap.entries())
        .forEach(
          ([property, value]) => {
            setStyle(styleTarget, property, value.toStyleString())
          });
    });
  }

  public destroy(): void {}
}

export {Tween};
