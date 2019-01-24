import {propertyToTweenableValue} from "./property-to-tweenable-value";
import {ITweenableValueInstance} from "./interfaces/tweenable-value";

function getTweenableValue(
  property: string,
  value: string
): ITweenableValueInstance {
  return propertyToTweenableValue.get(property).fromStyleString(value);
}

export {getTweenableValue};
