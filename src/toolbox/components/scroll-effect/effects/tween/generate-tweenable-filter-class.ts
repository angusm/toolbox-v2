import {
  IFilterValueInstance,
  IFilterValueStatic
} from "../../../../utils/dom/style/filter/filter-value/i-filter-value";
import {
  ITweenableValueInstance,
  ITweenableValueStatic
} from "./interfaces/tweenable-value";
import {Filter} from "../../../../utils/dom/style/filter/filter";
import {flatten} from "../../../../utils/array/flatten";
import {sum} from "../../../../utils/math/sum";
import {MultiValueDynamicDefaultMap} from "../../../../utils/map/multi-value-dynamic-default";

const generatedTweenableFilterClasses:
  MultiValueDynamicDefaultMap<IFilterValueStatic, ITweenableValueStatic> =
  MultiValueDynamicDefaultMap.usingFunction(generateTweenableFilterClass_);

function generateTweenableFilterClass_(
  FilterValueClasses: IFilterValueStatic[]
): ITweenableValueStatic {

  const totalValuesLength =
    sum(
      ...FilterValueClasses
        .map((FilterValueClass) => FilterValueClass.valuesLength));

  class TweenableFilterClass implements ITweenableValueInstance {
    ['constructor']: typeof TweenableFilterClass;
    public static valuesLength: number = totalValuesLength;
    private readonly values_: number[];

    constructor(...values: number[]) {
      this.values_ = values;
    }

    public static fromNumbers(...values: number[]): TweenableFilterClass {
      return new TweenableFilterClass(...values);
    }

    public toNumbers(): number[] {
      return this.values_.slice();
    }

    public static fromStyleString(style: string): TweenableFilterClass {
      return new TweenableFilterClass(
        ...flatten(
          Filter.fromStyleString(style)
            .getFilterValues()
            .map((filterValue) => filterValue.toNumbers())
        )
      );
    }

    public toStyleString(): string {
      let remainingValues = this.values_.slice();
      return FilterValueClasses
        .reduce(
          (result, FilterValueClass: IFilterValueStatic) => {
            const valuesToUse =
              remainingValues.slice(0, FilterValueClass.valuesLength);
            remainingValues =
              remainingValues.slice(FilterValueClass.valuesLength);

            const filterValue: IFilterValueInstance =
              <IFilterValueInstance>FilterValueClass
                .fromNumbers(...valuesToUse);

            return `${result} ${filterValue.toStyleString()}`;
          },
          ''
        );
    }
  }

  return TweenableFilterClass;
}

function generateTweenableFilterClass(
  FilterValueClasses: IFilterValueStatic[]
): ITweenableValueStatic {
  return generatedTweenableFilterClasses.get(FilterValueClasses);
}

export {generateTweenableFilterClass};
