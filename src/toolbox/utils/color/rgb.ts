import {IMeasurableInstance} from "../math/interfaces/measurable";
import {MultiValueMap} from "../map/multi-value";
import {Vector} from "../math/geometry/vector";

const rgbInstances = new MultiValueMap<number, RGB>();

class RGB extends Vector implements IMeasurableInstance {
  ['constructor']: typeof RGB; // For checking interface static methods
  readonly red_: number;
  readonly green_: number;
  readonly blue_: number;

  constructor(red: number = 0, green: number = 0, blue: number = 0) {
    super(red, green, blue);

    if (rgbInstances.has([red, green, blue])) {
      return rgbInstances.get([red, green, blue]);
    } else {
      this.red_ = red;
      this.green_ = green;
      this.blue_ = blue;
      rgbInstances.set([red, green, blue], this);
      return this;
    }
  }

  public getRed(): number {
    return this.red_;
  }

  public getGreen(): number {
    return this.green_;
  }

  public getBlue(): number {
    return this.blue_;
  }

  public toNumbers(): number[] {
    return [this.red_, this.green_, this.blue_];
  }

  public static fromNumbers(...values: number[]): RGB {
    return new this(...values);
  }
}

export {RGB};
