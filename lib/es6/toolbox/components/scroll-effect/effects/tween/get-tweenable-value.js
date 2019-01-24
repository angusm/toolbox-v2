import { propertyToTweenableValue } from "./property-to-tweenable-value";
function getTweenableValue(property, value) {
    return propertyToTweenableValue.get(property).fromStyleString(value);
}
export { getTweenableValue };
//# sourceMappingURL=get-tweenable-value.js.map