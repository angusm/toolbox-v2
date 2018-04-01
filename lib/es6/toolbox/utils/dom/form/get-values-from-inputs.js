import { getAttributeValue } from '../get-attribute-value';
import { getInputValue } from './get-input-value';
function getValuesFromInputs(inputs) {
    return Array.from(inputs)
        .reduce(function (result, input) {
        var inputName = getAttributeValue(input, 'name');
        result[inputName] = getInputValue(input);
        return result;
    }, {});
}
export { getValuesFromInputs };
//# sourceMappingURL=get-values-from-inputs.js.map