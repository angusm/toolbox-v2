"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_symbol_1 = require("../../default-symbol");
var get_attribute_value_1 = require("../get-attribute-value");
var run_map_as_switch_1 = require("../../run-map-as-switch");
var getValueFnsByType = new Map([
    ['checkbox', isChecked_],
    ['radio', getRadioInputValue_],
    [default_symbol_1.defaultSymbol, function (input) { return input.value; }],
]);
function isChecked_(input) {
    return input.checked;
}
function getRadioInputValue_(input) {
    var checkedInput = Array.from(getMatchingRadioInputs_(input))
        .find(isChecked_);
    return checkedInput ? checkedInput.value : null;
}
function getMatchingRadioInputs_(input) {
    var name = get_attribute_value_1.getAttributeValue(input, 'name');
    return document.body.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
}
function getInputValue(input) {
    var type = get_attribute_value_1.getAttributeValue(input, 'type');
    return run_map_as_switch_1.runMapAsSwitch(getValueFnsByType, type, input);
}
exports.getInputValue = getInputValue;
//# sourceMappingURL=get-input-value.js.map