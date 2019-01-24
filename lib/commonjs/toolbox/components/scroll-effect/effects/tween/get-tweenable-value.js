"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_to_tweenable_value_1 = require("./property-to-tweenable-value");
function getTweenableValue(property, value) {
    return property_to_tweenable_value_1.propertyToTweenableValue.get(property).fromStyleString(value);
}
exports.getTweenableValue = getTweenableValue;
//# sourceMappingURL=get-tweenable-value.js.map