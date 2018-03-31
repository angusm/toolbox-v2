import {getAsList} from '../../object/get-as-list';
import {getAttributeValue} from '../get-attribute-value';
import {getInputValue} from './get-input-value';

function getValuesFromInputs(inputs: NodeList) {
  return Array.from(inputs)
    .reduce(
      (result: {[s: string]: string}, input: HTMLInputElement) => {
        const inputName = getAttributeValue(input, 'name');
        result[inputName] = getInputValue(input);
        return result;
      }, {});
}

export {getValuesFromInputs};
