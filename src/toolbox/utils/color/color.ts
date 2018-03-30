import {ColorMap} from './color-map';
import {Vector} from '../math/geometry/vector';
import {getSubstringsOfLength} from '../string/get-substrings-of-length';
import {hexToInt} from '../hex-to-int';
import {max} from '../iterable/max';
import {trim} from '../string/trim';

const HEX_VALUES = '0123456789abcdefABCDEF';

class RGB extends Vector {
  private red_: number;
  private green_: number;
  private blue_: number;

  constructor(red: number = 0, green: number = 0, blue: number = 0) {
    super(red, green, blue);
    this.red_ = red;
    this.green_ = green;
    this.blue_ = blue;
  }
}


class Color {
  private rgb_: RGB;
  private alpha_: number;

  constructor(
    red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1
  ) {
    this.rgb_ = new RGB(red, green, blue);
    this.alpha_ = alpha;
  }

  public static fromString(value: string): Color {
    if (Color.isHexValue_(value)) {
      return this.fromHex_(value);
    } else if (value.slice(0, 3) === 'rgb') {
      return this.fromRgb_(value);
    } else if (ColorMap.get(value)) {
      return this.fromHex_(ColorMap.get(value));
    } else {
      console.error('Invalid string provided to Color.fromString');
    }
  }

  public static fromHex_(value: string): Color {
    const hexValue: string = value.split('#').slice(-1)[0];
    if (hexValue.length !== 3 && hexValue.length !== 6) {
      console.error('Invalid hexValue provided to Color');
    }
    const valueLength = hexValue.length / 3;
    const colorValues: string[] = getSubstringsOfLength(hexValue, valueLength);
    return new Color(...colorValues.map((colorValue: string) => hexToInt(colorValue)));
  }

  public static fromRgb_(value: string): Color {
    const values = value.split('(').slice(-1)[0].split(')')[0].split(',');
    const intValues = values.map(trim).map((trimmed) => parseInt(trimmed));
    return new Color(...intValues);
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

  public getColorWithHighestContrast(...colors: Color[]): Color {
    return max(
      colors, (color) => color.getRGB().subtract(this.getRGB()).getLength());
  }

  public toStyleString(): string {
    const values = [...this.getRGB().getValues(), this.alpha_];
    return `rgba(${values.join(', ')})`;
  }
}

export {Color, RGB};
