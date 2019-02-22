import {NumericRange} from "../math/numeric-range";
import {IRange} from "../interfaces/range";
import {average} from "../math/average";
import {
  IMeasurableInstance,
  IMeasurableStatic,
  MeasurableFunctions
} from "./interfaces/measurable";
import {zip} from "../array/zip";
import {getSharedClass} from "../inheritance/get-shared-class";

class MeasurableRange implements IRange<IMeasurableInstance> {
  private readonly class_: IMeasurableStatic;
  private readonly min_: IMeasurableInstance;
  private readonly max_: IMeasurableInstance;
  private readonly ranges_: NumericRange[];

  constructor(min: IMeasurableInstance, max: IMeasurableInstance) {
    this.class_ =
      <IMeasurableStatic>getSharedClass(
        min.constructor, max.constructor);
    this.min_ = min;
    this.max_ = max;
    this.ranges_ =
      zip(min.toNumbers(), max.toNumbers())
        .map(([minValue, maxValue]) => new NumericRange(minValue, maxValue));
  }

  private zipRangeAndNumbers_(value: IMeasurableInstance): (NumericRange|number)[][] {
    return zip<NumericRange|number>(this.ranges_, value.toNumbers());
  }

  public clamp(value: IMeasurableInstance): IMeasurableInstance {
    return this.class_.fromNumbers(
      ...this.zipRangeAndNumbers_(value)
          .map(([range, value]) => (<NumericRange>range).clamp(<number>value)));
  }

  public contains(value: IMeasurableInstance): boolean {
    return this.zipRangeAndNumbers_(value)
        .reduce(
          (result, [range, value]) => {
            return (<NumericRange>range).contains(<number>value) && result;
          },
          true
        );
  }

  public add(value: IMeasurableInstance): MeasurableRange {
    return new MeasurableRange(
      MeasurableFunctions.add(this.min_, value),
      MeasurableFunctions.add(this.max_, value));
  }

  public subtract(value: IMeasurableInstance): MeasurableRange {
    return new MeasurableRange(
      MeasurableFunctions.subtract(this.min_, value),
      MeasurableFunctions.subtract(this.max_, value));
  }

  public expand(value: IMeasurableInstance): MeasurableRange {
    return new MeasurableRange(
      MeasurableFunctions.subtract(this.min_, value),
      MeasurableFunctions.add(this.max_, value));
  }

  public collapse(value: IMeasurableInstance): MeasurableRange {
    return new MeasurableRange(
      MeasurableFunctions.add(this.min_, value),
      MeasurableFunctions.subtract(this.max_, value));
  }

  public getMin(): IMeasurableInstance {
    return this.min_;
  }

  public getMax(): IMeasurableInstance {
    return this.max_;
  }

  /**
   * Returns an average of the percentages for each number range.
   */
  public getValueAsPercent(value: IMeasurableInstance): number {
    return average(
      ...this.zipRangeAndNumbers_(value)
        .map(
          ([range, value]) => {
            return (<NumericRange>range).getValueAsPercent(<number>value)}));
  }

  public getPercentAsValue(percent: number): IMeasurableInstance {
    return this.class_.fromNumbers(
      ...this.ranges_.map((range) => range.getPercentAsValue(percent)));
  }

  public getRanges() {
    return this.ranges_;
  }

  public getOverlap(overlap: MeasurableRange): MeasurableRange {
    const overlaps =
      zip(this.ranges_, overlap.getRanges()).map(([a, b]) => a.getOverlap(b));

    return new MeasurableRange(
      this.class_.fromNumbers(...overlaps.map((overlap) => overlap.getMin())),
      this.class_.fromNumbers(...overlaps.map((overlap) => overlap.getMax()))
    );
  }
}

export {MeasurableRange};
