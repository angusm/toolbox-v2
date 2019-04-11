import {Keyframe} from "./keyframe";
import {NumericRange} from "../../../../utils/math/numeric-range";
import {MeasurableRange} from "../../../../utils/math/measurable-range";
import {ITweenableValueInstance} from "./interfaces/tweenable-value";

/**
 * Represents a pair of subsequent keyframes.
 */
class KeyframePair {
  private readonly positionRange_: NumericRange;
  private readonly keyframeA_: Keyframe;
  private readonly keyframeB_: Keyframe;
  private readonly getValueRange_: () => MeasurableRange;

  /**
   * @param keyframeA First keyframe in the pair.
   * @param keyframeB Last keyframe in the pair.
   */
  constructor(keyframeA: Keyframe, keyframeB: Keyframe) {
    this.positionRange_
      = new NumericRange(keyframeA.getPosition(), keyframeB.getPosition());
    this.keyframeA_ = keyframeA;
    this.keyframeB_ = keyframeB;
    this.getValueRange_ =
      KeyframePair.createGetValueRangeFunction_(keyframeA, keyframeB);
  }

  /**
   * Returns whether the given position is contained in between the pair.
   * @param position Numeric position.
   */
  public containsPosition(position: number): boolean {
    return this.positionRange_.contains(position);
  }

  /**
   * The style at the given position between the keyframes.
   * @param position The position whose value should be returned.
   */
  public getValueAtPosition(position: number): ITweenableValueInstance {
    let percent :number;
    if (this.positionRange_.getMin() === Number.NEGATIVE_INFINITY) {
      percent = 0;
    } else if (this.positionRange_.getMax() === Number.POSITIVE_INFINITY) {
      percent = 100;
    } else {
      percent = this.positionRange_.getValueAsPercent(position);
    }
    return <ITweenableValueInstance>(
      this.getValueRange_().getPercentAsValue(percent));
  }

  private static createGetValueRangeFunction_(
    keyframeA: Keyframe, keyframeB: Keyframe
  ): () => MeasurableRange {
    // If the values are dynamic then the Measurable range will need to be
    // recreated every time
    if (keyframeA.isDynamicValue() || keyframeB.isDynamicValue()) {
      return () => {
        return new MeasurableRange(
          keyframeA.getValue(keyframeB),
          keyframeB.getValue(keyframeA));
      };

    // If the values are static, we can cache it and always return the same
    // instance.
    } else {
      const measurableRange =
        new MeasurableRange(
          keyframeA.getValue(keyframeB),
          keyframeB.getValue(keyframeA));
      return () => measurableRange;
    }
  }

  /**
   * Returns the value at the given position between the given keyframe pairs.
   * @param position The position whose value should be returned.
   * @param keyframePairs The keyframe pairs to check for the given position.
   */
  public static getValueFromRanges(
    position: number,
    keyframePairs: KeyframePair[]
  ): ITweenableValueInstance {
    return keyframePairs
      .find(
        (keyframePair: KeyframePair) => keyframePair.containsPosition(position))
      .getValueAtPosition(position);
  }

  /**
   * Groups keyframes by position and returns them as a list of KeyframePairs.
   * @param keyframes The keyframes to group into pairs.
   */
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
