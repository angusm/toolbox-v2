"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValuesFromInputs = void 0;
var get_attribute_value_1 = require("../get-attribute-value");
var get_input_value_1 = require("./get-input-value");
function getValuesFromInputs(inputs) {
    return Array.from(inputs)
        .reduce(function (result, input) {
        var inputName = get_attribute_value_1.getAttributeValue(input, 'name');
        result[inputName] = get_input_value_1.getInputValue(input);
        return result;
    }, {});
}
exports.getValuesFromInputs = getValuesFromInputs;
//# sourceMappingURL=get-values-from-inputs.js.map