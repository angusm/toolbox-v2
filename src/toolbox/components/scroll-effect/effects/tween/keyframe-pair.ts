import {Keyframe} from "./keyframe";
import {NumericRange} from "../../../../utils/math/numeric-range";
import {MeasurableRange} from "../../../../utils/math/measurable-range";
import {ITweenableValueInstance} from "./interfaces/tweenable-value";

class KeyframePair {
  private readonly positionRange_: NumericRange;
  private readonly valueRange_: MeasurableRange;

  constructor(keyframeA: Keyframe, keyframeB: Keyframe) {
    this.positionRange_
      = new NumericRange(keyframeA.getPosition(), keyframeB.getPosition());
    this.valueRange_ =
      new MeasurableRange(keyframeA.getValue(), keyframeB.getValue());
  }

  public containsPosition(position: number): boolean {
    return this.positionRange_.contains(position);
  }

  public getValueAtPosition(position: number): ITweenableValueInstance {
    let percent :number;
    if (this.positionRange_.getMin() === Number.NEGATIVE_INFINITY) {
      percent = 0;
    } else if (this.positionRange_.getMax() === Number.POSITIVE_INFINITY) {
      percent = 100;
    } else {
      percent = this.positionRange_.getValueAsPercent(position);
    }
    return <ITweenableValueInstance>this.valueRange_.getPercentAsValue(percent);
  }

  public static getValueFromRanges(
    position: number,
    keyframePairs: KeyframePair[]
  ): ITweenableValueInstance {
    return keyframePairs
      .find(
        (keyframePair: KeyframePair) => keyframePair.containsPosition(position))
      .getValueAtPosition(position);
  }

  public static fromKeyframes(keyframes: Keyframe[]): KeyframePair[] {
    const sortedKeyframes: Keyframe[] =
      keyframes
        .sort((a: Keyframe, b: Keyframe) => a.getPosition() - b.getPosition());

    const firstKeyframe: Keyframe = sortedKeyframes[0];
    const firstPair: KeyframePair =
      new KeyframePair(
        firstKeyframe.setPosition(Number.NEGATIVE_INFINITY), firstKeyframe);

    const interstitialPairs: KeyframePair[] =
      sortedKeyframes
        .slice(1)
        .map(
          (a: Keyframe, index: number) => {
            return new KeyframePair(sortedKeyframes[index], a);
          });

    const lastKeyframe: Keyframe = sortedKeyframes.slice(-1)[0];
    const lastPair: KeyframePair =
      new KeyframePair(
        lastKeyframe, lastKeyframe.setPosition(Number.POSITIVE_INFINITY));

    return [firstPair, ...interstitialPairs, lastPair];
  }
}

export {KeyframePair};
