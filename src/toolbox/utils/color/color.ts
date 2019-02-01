import {ColorMap} from './color-map';
import {getSubstringsOfLength} from '../string/get-substrings-of-length';
import {hexToInt} from '../hex-to-int';
import {max} from '../iterable/max';
import {trim} from '../string/trim';
import {getStyle} from "../dom/style/get-style";
import {MultiValueMap} from "../map/multi-value";
import {zip} from "../array/zip";
import {sum} from "../math/sum";
import {RGB} from "./rgb";
import {ICssStyleValueInstance} from "../dom/style/interfaces/css-style-value";
import {IMeasurableInstance} from "../math/interfaces/measurable";

const HEX_VALUES = '0123456789abcdefABCDEF';

const colorInstances = new MultiValueMap<number, Color>();


class Color implements ICssStyleValueInstance, IMeasurableInstance {
  ['constructor']: typeof Color; // For checking interface static methods
  readonly rgb_: RGB;
  readonly alpha_: number;

  constructor(
    red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1
  ) {
    if (colorInstances.has([red, green, blue, alpha])) {
      return colorInstances.get([red, green, blue, alpha]);
    } else {
      this.rgb_ = new RGB(red, green, blue);
      this.alpha_ = alpha;
      colorInstances.set([red, green, blue, alpha], this);
      return this;
    }
  }

  public static fromStyleString(value: string): Color {
    if (Color.isHexValue_(value)) {
      return this.fromHex(value);
    } else if (value.slice(0, 3) === 'rgb') {
      return this.fromRgb(value);
    } else if (ColorMap.get(value)) {
      return this.fromHex(ColorMap.get(value));
    } else {
      console.error(
        `Invalid string "${value}" provided to Color.fromStyleString`);
    }
  }

  public static fromString(value: string): Color {
    console.warn(
      'Deprecating in favor of fromStyleString to add wider support for ICssStyleValueInstance');
    return this.fromStyleString(value);
  }

  public static fromHex(value: string): Color {
    const hexValue: string = value.split('#').slice(-1)[0];
    if (hexValue.length !== 3 && hexValue.length !== 6) {
      console.error('Invalid hexValue provided to Color');
    }
    const valueLength = hexValue.length / 3;
    const colorValues: string[] = getSubstringsOfLength(hexValue, valueLength);
    return new Color(...colorValues.map((colorValue: string) => hexToInt(colorValue)));
  }

  public static fromHexes(...values: string[]): Color[] {
    return values.map((value) => this.fromHex(value));
  }

  public static fromRgb(value: string): Color {
    const values = value.split('(').slice(-1)[0].split(')')[0].split(',');
    const intValues = values.map(trim).map((trimmed) => parseInt(trimmed));
    return new Color(...intValues);
  }

  public static fromElementBackgroundColor(el: HTMLElement) {
    return this.fromString(getStyle(el, 'background-color'));
  }

  public static isHexValue_(value: string) {
    if (value[0] === '#') {
      value = value.slice(1);
    }
    return value
      .split('').every((character) => HEX_VALUES.indexOf(character) !== -1);
  }

  public getRGB(): RGB {
    return this.rgb_;
  }

  public getAlpha(): number {
    return this.alpha_;
  }

  public getColorWithHighestContrast(...colors: Color[]): Color {
    return max(
      colors, (color) => color.getRGB().subtract(this.getRGB()).getLength());
  }

  public toStyleString(): string {
    const values =
      [
        ...this.getRGB().getValues().map((value) => Math.round(value)),
        this.alpha_
      ];
    return `rgba(${values.join(', ')})`;
  }

  public toNumbers(): number[] {
    return [...this.rgb_.toNumbers(), this.alpha_];
  }

  public static fromNumbers(...values: number[]): Color {
    return new Color(...values);
  }
}

export {Color};
