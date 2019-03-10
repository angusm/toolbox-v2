import {defaultSymbol} from '../../default-symbol';
import {getAttributeValue} from '../get-attribute-value';
import {runMapAsSwitch} from '../../run-map-as-switch';

type Value = string|boolean;
type SwitchParam = string|symbol;
type GetValueFn = (el: HTMLInputElement) => Value;

const getValueFnsByType: Map<SwitchParam, GetValueFn> =
  new Map<SwitchParam, GetValueFn>([
    ['checkbox', isChecked_],
    ['radio', getRadioInputValue_],
    [defaultSymbol, (input: HTMLInputElement) => input.value],
  ]);

function isChecked_(input: HTMLInputElement): boolean {
  return input.checked;
}

function getRadioInputValue_(input: HTMLInputElement): string {
  const checkedInput: HTMLInputElement =
    <HTMLInputElement>Array.from(getMatchingRadioInputs_(input))
      .find(isChecked_);

  return checkedInput ? checkedInput.value : null;
}

function getMatchingRadioInputs_(input: HTMLInputElement): NodeList {
  const name = getAttributeValue(input, 'name');
  return document.body.querySelectorAll(`input[type="radio"][name="${name}"]`);
}

function getInputValue(input: HTMLInputElement): string {
  const type = getAttributeValue(input, 'type');
  return <string>runMapAsSwitch(getValueFnsByType, type, input);
}

export {getInputValue};
