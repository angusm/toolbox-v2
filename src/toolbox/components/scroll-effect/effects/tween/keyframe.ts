/**
 * A keyframe for a single property in a scroll based animation
 */
import {TKeyframesConfig} from "./types/t-keyframes-config";
import {styleStringToMap} from "../../../../utils/dom/style/style-string-to-map";
import {flatten} from "../../../../utils/array/flatten";
import {
  ITweenableValueInstance,
  ITweenableValueStatic
} from "./interfaces/tweenable-value";
import {propertyToTweenableValue} from "./property-to-tweenable-value";
import {getTweenableValue} from "./get-tweenable-value";
import {Transform} from "../../../../utils/dom/style/transform/transform";
import {generateTweenableTransformClass} from "./generate-tweenable-transform-class";
import {ITransformValueStatic} from "../../../../utils/dom/style/transform/transform-value/i-transform-value";
import {TransformValueBase} from "../../../../utils/dom/style/transform/transform-value/transform-value-base";
import {zip} from "../../../../utils/array/zip";
import {TKeyframesConfigStyleValue} from "./types/t-keyframes-config-style-value";
import {TKeyframesConfigPropertyStyleMap} from "./types/t-keyframes-config-property-style-map";
import {DynamicDefaultMap} from "../../../../utils/map/dynamic-default";

type TPositionStylePair = [number, TKeyframesConfigPropertyStyleMap];
type TPositionPropertyStyleMapPair = [number, TKeyframesConfigPropertyStyleMap];
type TSortedPropertyStyleMaps = TPositionPropertyStyleMapPair[];

/**
 * Stores information on a Keyframe in a Tweenable animation.
 */
class Keyframe {
  private readonly position_: number;
  private readonly property_: string;
  private readonly value_: TKeyframesConfigStyleValue;
  private cachedValue_: ITweenableValueInstance = null;

  constructor(
    position: number,
    property: string,
    value: TKeyframesConfigStyleValue
  ) {
    this.position_ = position;
    this.property_ = property;
    this.value_ = value;
  }

  public getPosition(): number {
    return this.position_;
  }

  public getProperty(): string {
    return this.property_
  }

  public getValue(adjacentKeyframe?: Keyframe): ITweenableValueInstance {
    if (this.cachedValue_ !== null) {
      return this.cachedValue_;
    } else if (this.property_ === 'transform') {
      return this.getTransformValue_(adjacentKeyframe);

    // Conditional caching for performance.
    } else if (typeof this.value_ === 'string') {
      this.cachedValue_ = getTweenableValue(this.property_, this.getRawValue());
      return this.cachedValue_;

    } else {
      return getTweenableValue(this.property_, this.getRawValue());
    }
  }

  public getRawValue(): string {
    return typeof this.value_ === 'string' ? this.value_ : this.value_();
  }

  public setPosition(position: number): Keyframe {
    return new Keyframe(position, this.property_, this.value_);
  }

  private static isValidTweenableProperty_(property: string): boolean {
    return  propertyToTweenableValue.has(property) || property === 'transform';
  }

  private static parseStyleMap_(
    position: number,
    styleMap: TKeyframesConfigPropertyStyleMap
  ): Keyframe[] {
    return Array.from(styleMap.entries())
        .filter(([property, _]) => Keyframe.isValidTweenableProperty_(property))
        .map(([property, value]) => new Keyframe(position, property, value));
  }

  public static parseConfig(config: TKeyframesConfig): Keyframe[] {
    const sortedStyleMaps = this.configToSortedStyleMaps_(config);

    return flatten(
      sortedStyleMaps.map(
        ([position, styleMap]: TPositionPropertyStyleMapPair) => {
          return Keyframe.parseStyleMap_(position, styleMap)
        }));
  }

  private static configToSortedStyleMaps_(
    config: TKeyframesConfig
  ): TSortedPropertyStyleMaps {

    // Consolidate duplicate frames
    const mappedStyles: Map<number, TKeyframesConfigPropertyStyleMap> =
      DynamicDefaultMap
        .usingFunction(() => new Map<string, TKeyframesConfigStyleValue>());

    config.forEach(
      ([position, style]) => {
        const positionMap = mappedStyles.get(position);
        const styleMap: TKeyframesConfigPropertyStyleMap =
          typeof style === 'string' ? styleStringToMap(style) : style;
        styleMap.forEach((value, style) => positionMap.set(style, value));
      });

    return Array.from(mappedStyles.entries())
      .sort((a: TPositionStylePair, b: TPositionStylePair) => a[0] - b[0]);
  }

  private static getTransformClassesInOrder_(
    transforms: Transform[]
  ): ITransformValueStatic[] {
    const orderedListsOfTransformClasses: ITransformValueStatic[][] =
      transforms.map((transform) => transform.getTransformValueClasses());

    const transformClassesInOrder = [];
    for (
      let position = 0;
      position < orderedListsOfTransformClasses.length;
      position++
    ) {

      const classesForPosition = orderedListsOfTransformClasses[position];
      for (
        let classIndex = 0;
        classIndex < classesForPosition.length;
        classIndex++
      ) {
        const classToAdd = classesForPosition[classIndex];
        transformClassesInOrder.push(classToAdd);

        for (let k = 0; k < orderedListsOfTransformClasses.length; k++) {
          const subsequentClassesForPosition =
            orderedListsOfTransformClasses[k];

          if (subsequentClassesForPosition[0] === classToAdd) {
            orderedListsOfTransformClasses[k] =
              subsequentClassesForPosition.slice(1);
          }
        }
      }
    }

    return transformClassesInOrder;
  }

  private getTransformValue_(
    adjacentKeyframe: Keyframe
  ): ITweenableValueInstance {
    const sortedKeyframes =
      [this, adjacentKeyframe]
        .sort((a, b) => a.getPosition() - b.getPosition());
    const sortedTransforms =
      sortedKeyframes
        .map((keyframe) => Transform.fromStyleString(keyframe.getRawValue()));

    const primaryTransform = Transform.fromStyleString(this.getRawValue());

    const transformClassesInOrder =
      Keyframe.getTransformClassesInOrder_(sortedTransforms);
    const TweenableTransformClass =
      generateTweenableTransformClass(transformClassesInOrder);

    const transformValues = primaryTransform.getTransformValues();
    const transformClasses = primaryTransform.getTransformValueClasses();
    let numbers: number[] = [];
    let currentTransformClassesIndex = 0;
    let allTransformClassesIndex = 0;

    while (
      allTransformClassesIndex < transformClassesInOrder.length
    ) {
      const anticipatedTransformClass =
        transformClassesInOrder[allTransformClassesIndex];
      const currentTransformClass =
        transformClasses[currentTransformClassesIndex];

      if (anticipatedTransformClass === currentTransformClass) {
        numbers = [
          ...numbers,
          ...transformValues[currentTransformClassesIndex].toNumbers()];
        currentTransformClassesIndex++;
      } else {
        numbers = [
          ...numbers,
          ...anticipatedTransformClass.getDefaultValue().toNumbers()];
      }
      allTransformClassesIndex++;
    }

    return TweenableTransformClass.fromNumbers(...numbers);
  }
}

export {Keyframe};
