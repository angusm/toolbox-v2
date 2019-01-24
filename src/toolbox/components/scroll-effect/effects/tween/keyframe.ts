/**
 * A keyframe for a single property in a scroll based animation
 */
import {TKeyframesConfig} from "./keyframes-config";
import {styleStringToMap} from "../../../../utils/dom/style/style-string-to-map";
import {flatten} from "../../../../utils/array/flatten";
import {ITweenableValueInstance} from "./interfaces/tweenable-value";
import {propertyToTweenableValue} from "./property-to-tweenable-value";
import {getTweenableValue} from "./get-tweenable-value";

type MappedStyles = Map<number, string>;

class Keyframe {
  readonly position_: number;
  readonly property_: string;
  readonly value_: ITweenableValueInstance;

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
    const mappedStyles: MappedStyles = this.mapKeyframesConfig_(config);
    const keyframes: Keyframe[][] =
      Array.from(mappedStyles.entries())
        .sort((a: [number, string], b: [number, string]) => a[0] - b[0])
        .map(
          ([x, styleString]: [number, string]) => {
            return [x, styleStringToMap(styleString)];
          })
        .map(
          ([position, styleObject]: [number, Map<string, string>]) => {
            return Keyframe.parseStyleMap_(position, styleObject)
          });
    return flatten(keyframes);
  }

  private static mapKeyframesConfig_(config: TKeyframesConfig): MappedStyles {
    // Consolidate duplicate frames
    const mappedStyles: MappedStyles = new Map<number, string>();
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
