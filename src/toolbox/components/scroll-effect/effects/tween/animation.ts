import {Keyframe} from "./keyframe";
import {TKeyframesConfig} from "./t-keyframes-config";
import {KeyframePair} from "./keyframe-pair";
import {ITweenableValueInstance} from "./interfaces/tweenable-value";
import {ArrayMap} from "../../../../utils/map/array";

class Animation {
  private keyframePairsByProperty_: ArrayMap<string, KeyframePair>;

  constructor(keyframes: Keyframe[]) {
    this.keyframePairsByProperty_ = Animation.pairKeyframes_(keyframes);
  }

  private static pairKeyframes_(
    keyframes: Keyframe[]
  ): ArrayMap<string, KeyframePair> {
    const mappedKeyframes: ArrayMap<string, Keyframe> =
      this.mapKeyframesByProperty_(keyframes);
    return Array.from(mappedKeyframes.entries())
      .reduce(
        (map, [property, keyframes]) => {
          map.set(property, KeyframePair.fromKeyframes(keyframes));
          return map;
        },
        new ArrayMap<string, KeyframePair>());
  }

  private static mapKeyframesByProperty_(
    keyframes: Keyframe[]
  ): ArrayMap<string, Keyframe> {
    return keyframes
      .reduce(
        (map, keyframe) => {
          map.get(keyframe.getProperty()).push(keyframe);
          return map;
        },
        new ArrayMap<string, Keyframe>()
      );
  }

  public getPropertyValueMapFromPosition(
    position: number
  ): Map<string, ITweenableValueInstance> {
    const pairs: [string, ITweenableValueInstance][] =
      Array.from(this.keyframePairsByProperty_.keys())
        .map(
          (property) => {
            const keyframePairs: KeyframePair[] =
              this.keyframePairsByProperty_.get(property);
            const value: ITweenableValueInstance =
              KeyframePair.getValueFromRanges(position, keyframePairs);
            return <[string, ITweenableValueInstance]>[property, value];
          });

    return new Map<string, ITweenableValueInstance>(pairs);
  }

  public static fromKeyframesConfig(config: TKeyframesConfig): Animation {
    return new Animation(Keyframe.parseConfig(config));
  }
}

export {Animation};
