import { defaultSymbol } from '../../default-symbol';
import { getAsList } from '../../object/get-as-list';
import { getAttributeValue } from '../get-attribute-value';
import { runMapAsSwitch } from '../../run-map-as-switch';
var getValueFnsByType = new Map([
    ['checkbox', isChecked_],
    ['radio', getRadioInputValue_],
    [defaultSymbol, function (input) { return input.value; }],
]);
function isChecked_(input) {
    return input.checked;
}
function getRadioInputValue_(input) {
    var checkedInput = getAsList(getMatchingRadioInputs_(input))
        .find(isChecked_);
    return checkedInput ? checkedInput.value : null;
}
function getMatchingRadioInputs_(input) {
    var name = getAttributeValue(input, 'name');
    return document.body.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
}
function getInputValue(input) {
    var type = getAttributeValue(input, 'type');
    return runMapAsSwitch(getValueFnsByType, type, input);
}
export { getInputValue };
//# sourceMappingURL=get-input-value.js.map