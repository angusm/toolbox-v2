import {IMeasurableInstance} from "../math/interfaces/measurable";
import {Vector} from "../math/geometry/vector";


class RGB extends Vector implements IMeasurableInstance {
  ['constructor']: typeof RGB; // For checking interface static methods
  private readonly red_: number;
  private readonly green_: number;
  private readonly blue_: number;

  constructor(red: number = 0, green: number = 0, blue: number = 0) {
    super(red, green, blue);

    this.red_ = red;
    this.green_ = green;
    this.blue_ = blue;
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
