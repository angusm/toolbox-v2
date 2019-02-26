/**
 * A keyframe for a single property in a scroll based animation
 */
import {TKeyframesConfig} from "./t-keyframes-config";
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

type TPositionStylePair = [number, string];
type TPositionStylesMap = Map<number, string>;
type TPropertyStyleMap = Map<string, string>;
type TPositionPropertyStyleMapPair = [number, TPropertyStyleMap];
type TSortedPropertyStyleMaps = TPositionPropertyStyleMapPair[];

/**
 * Stores information on a Keyframe in a Tweenable animation.
 */
class Keyframe {
  private readonly position_: number;
  private readonly property_: string;
  private readonly value_: ITweenableValueInstance;

  constructor(
    position: number,
    property: string,
    value: ITweenableValueInstance
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

  public getValue(): ITweenableValueInstance {
    return this.value_;
  }

  public setPosition(position: number): Keyframe {
    return new Keyframe(position, this.property_, this.value_);
  }

  private static parseStyleMap_(
    position: number,
    styleMap: Map<string, string>
  ): Keyframe[] {
    return Array.from(styleMap.entries())
        .filter(([property, value]) => propertyToTweenableValue.has(property))
        .map(
          ([property, value]) => {
            return new Keyframe(
              position, property, getTweenableValue(property, value));
          });
  }

  public static parseConfig(config: TKeyframesConfig): Keyframe[] {
    const sortedStyleMaps = this.configToSortedStyleMaps_(config);

    return [
      ...this.getTransformTweenableKeyframes_(sortedStyleMaps),
      ...this.getSimpleTweenableKeyframes_(sortedStyleMaps),
    ];
  }

  private static configToSortedStyleMaps_(
    config: TKeyframesConfig
  ): TSortedPropertyStyleMaps {
    const mappedStyles: TPositionStylesMap = this.mapKeyframesConfig_(config);

    return Array.from(mappedStyles.entries())
      .sort((a: TPositionStylePair, b: TPositionStylePair) => a[0] - b[0])
      .map(
        ([position, styleString]: TPositionStylePair) => {
          return <TPositionPropertyStyleMapPair>[
            position, styleStringToMap(styleString)];
        });
  }

  private static getTransformStyleMaps_(
    sortedStyleMaps: TSortedPropertyStyleMaps
  ): TSortedPropertyStyleMaps {
     return sortedStyleMaps
      .filter(
        ([position, styleMap]: TPositionPropertyStyleMapPair) => {
          return styleMap.has('transform');
        }
      );
  }

  private static getTransformsByPosition_(
    sortedStyleMaps: TSortedPropertyStyleMaps
  ): [number, Transform][] {
    return this.getTransformStyleMaps_(sortedStyleMaps)
      .map(
        ([position, styleMap]: TPositionPropertyStyleMapPair) => {
          return <[number, Transform]>[
            position, Transform.fromStyleString(styleMap.get('transform'))];
        }
      );
  }

  private static getTransformClassesInOrder_(
    sortedStyleMaps: TSortedPropertyStyleMaps
  ): ITransformValueStatic[] {

    const transformsByPosition: [number, Transform][] =
      this.getTransformsByPosition_(sortedStyleMaps);

    const orderedListsOfTransformClasses: ITransformValueStatic[][] =
      transformsByPosition
        .map(([position, transform]) => transform.getTransformValueClasses());

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

  private static getTransformTweenableKeyframes_(
    sortedStyleMaps: TSortedPropertyStyleMaps
  ): Keyframe[] {

    const transformsByPosition: [number, Transform][] =
      this.getTransformsByPosition_(sortedStyleMaps);

    const transformClassesInOrder =
      Keyframe.getTransformClassesInOrder_(sortedStyleMaps);

    const TweenableTransformClass =
      generateTweenableTransformClass(transformClassesInOrder);

    const tweenableTransformsByPosition: [number, ITweenableValueInstance][] =
      transformsByPosition
        .map(
          ([position, transform]: [number, Transform]) => {
            const transformValues = transform.getTransformValues();
            const transformClasses = transform.getTransformValueClasses();
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

            const tweenableInstance: ITweenableValueInstance =
              TweenableTransformClass.fromNumbers(...numbers);
            return <[number, ITweenableValueInstance]>[
              position, tweenableInstance];
          }
        );

    return tweenableTransformsByPosition
      .map(
        ([position, tweenableTransformInstance]) => {
          return new Keyframe(
            position, 'transform', tweenableTransformInstance);
        });
  }

  private static getSimpleTweenableKeyframes_(
    sortedStyleMaps: TSortedPropertyStyleMaps
  ): Keyframe[] {
    return flatten(
      sortedStyleMaps
        .map(
          ([position, styleMap]: TPositionPropertyStyleMapPair) => {
            return Keyframe.parseStyleMap_(position, styleMap)
          }
        )
    );
  }

  private static mapKeyframesConfig_(config: TKeyframesConfig): TPositionStylesMap {
    // Consolidate duplicate frames
    const mappedStyles: TPositionStylesMap = new Map<number, string>();
    config
      .forEach(
        ([position, styleString]) => {
          if (mappedStyles.has(position)) {
            const splitStyles: string[] =
              [
                ...mappedStyles.get(position).split(';'),
                styleString
              ];
            mappedStyles.set(position, splitStyles.join(';'));
          } else {
            mappedStyles.set(position, styleString);
          }
        });
    return mappedStyles;
  }
}

export {Keyframe};
