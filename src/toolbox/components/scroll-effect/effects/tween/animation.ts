import {Keyframe} from "./keyframe";
import {TKeyframesConfig} from "./types/t-keyframes-config";
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
    const result = new ArrayMap<string, KeyframePair>();
    mappedKeyframes.forEach(
      (keyframes, property) => {
        result.set(property, KeyframePair.fromKeyframes(keyframes));
      });

    return result;
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
    const pairs: [string, ITweenableValueInstance][] = [];

    this.keyframePairsByProperty_.forEach(
        (keyframePairs, property) => {
          pairs.push([
            property,
            KeyframePair.getValueFromRanges(position, keyframePairs)
          ]);
        });

    return new Map<string, ITweenableValueInstance>(pairs);
  }

  public static fromKeyframesConfig(config: TKeyframesConfig): Animation {
    return new Animation(Keyframe.parseConfig(config));
  }
}

export {Animation};
