import {trim} from "../../string/trim";

function styleStringToMap(styleString: string): Map<string, string> {
  return styleString.split(';')
    .map((propertyStylePair) => propertyStylePair.split(':'))
    .map((pair) => pair.map((value) => trim(value)))
    .reduce(
      (result, [property, style]) => {
        result.set(property, style);
        return result;
      },
      new Map<string, string>());
}

export {styleStringToMap};
