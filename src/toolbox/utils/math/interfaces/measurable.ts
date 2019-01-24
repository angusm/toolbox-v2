import {zip} from "../../array/zip";
import {sum} from "../sum";
import {subtract} from "../subtract";
import {getSharedClass} from "../../inheritance/get-shared-class";

interface IMeasurableStatic<T=IMeasurableInstance> extends Function {
  new(...any: any[]): T;
  fromNumbers(...values: number[]): T;
}

interface IMeasurableInstance {
  ['constructor']: IMeasurableStatic
  toNumbers(): number[];
}

class MeasurableFunctions {
  private static zipValues_<T extends IMeasurableInstance>(
    ...values: T[]
  ): number[][] {
    return zip(...values.map((value) => value.toNumbers()));
  }

  private static getClasses_<T extends IMeasurableInstance>(
    ...values: T[]
  ): Function[] {
    return values.map((value) => value.constructor);
  }

  private static getSharedClass<T extends IMeasurableInstance>(
    ...values: T[]
  ): IMeasurableStatic<T> {
    const commonAncestorClass =
      getSharedClass(...this.getClasses_(...values));
    return (<IMeasurableStatic<T>>commonAncestorClass)
  }

  public static add<T extends IMeasurableInstance>(...values: T[]): T {
    const sums = this.zipValues_(...values).map((values) => sum(...values));
    return this.getSharedClass(...values).fromNumbers(...sums);
  }

  public static subtract<T extends IMeasurableInstance>(...values: T[]): T {
    const differences =
      this.zipValues_(...values).map((values) => subtract(...values));
    return this.getSharedClass(...values).fromNumbers(...differences);
  }
}

export {MeasurableFunctions, IMeasurableInstance, IMeasurableStatic}
