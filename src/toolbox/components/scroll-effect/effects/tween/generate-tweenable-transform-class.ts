import {
  ITransformValueInstance,
  ITransformValueStatic
} from "../../../../utils/dom/style/transform/transform-value/i-transform-value";
import {
  ITweenableValueInstance,
  ITweenableValueStatic
} from "./interfaces/tweenable-value";
import {Transform} from "../../../../utils/dom/style/transform/transform";
import {flatten} from "../../../../utils/array/flatten";
import {sum} from "../../../../utils/math/sum";
import {MultiValueDynamicDefaultMap} from "../../../../utils/map/multi-value-dynamic-default";

const generatedTweenableTransformClasses:
  MultiValueDynamicDefaultMap<ITransformValueStatic, ITweenableValueStatic> =
  MultiValueDynamicDefaultMap.usingFunction(generateTweenableTransformClass_);

function generateTweenableTransformClass_(
  TransformValueClasses: ITransformValueStatic[]
): ITweenableValueStatic {

  const totalValuesLength =
    sum(
      ...TransformValueClasses
        .map((TransformValueClass) => TransformValueClass.valuesLength));

  class TweenableTransformClass implements ITweenableValueInstance {
    ['constructor']: typeof TweenableTransformClass;
    public static valuesLength: number = totalValuesLength;
    private readonly values_: number[];

    constructor(...values: number[]) {
      this.values_ = values;
    }

    public static fromNumbers(...values: number[]): TweenableTransformClass {
      return new TweenableTransformClass(...values);
    }

    public toNumbers(): number[] {
      return this.values_.slice();
    }

    public static fromStyleString(style: string): TweenableTransformClass {
      return new TweenableTransformClass(
        ...flatten(
          Transform.fromStyleString(style)
            .getTransformValues()
            .map((transformValue) => transformValue.toNumbers())
        )
      );
    }

    public toStyleString(): string {
      let remainingValues = this.values_.slice();
      return TransformValueClasses
        .reduce(
          (result, TransformValueClass: ITransformValueStatic) => {
            const valuesToUse =
              remainingValues.slice(0, TransformValueClass.valuesLength);
            remainingValues =
              remainingValues.slice(TransformValueClass.valuesLength);

            const transformValue: ITransformValueInstance =
              <ITransformValueInstance>TransformValueClass
                .fromNumbers(...valuesToUse);

            return `${result} ${transformValue.toStyleString()}`;
          },
          ''
        );
    }
  }

  return TweenableTransformClass;
}

function generateTweenableTransformClass(
  TransformValueClasses: ITransformValueStatic[]
): ITweenableValueStatic {
  return generatedTweenableTransformClasses.get(TransformValueClasses);
}

export {generateTweenableTransformClass};
