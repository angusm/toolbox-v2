import {trim} from "../../string/trim";
import {contains} from "../../string/contains";

const VALUES_TO_TRIM = [' ', '\n', '\t'];

function styleStringToMap(styleString: string): Map<string, string> {
  if (typeof styleString !== 'string') { // Handle bad parameters
    console.warn(
      `A non-string value "${styleString}" (tyepof ${typeof styleString}) ` +
      `was provided to styleStringToMap`);
    return new Map<string, string>();
  }
  return styleString.split(';')
    .map((propertyStylePair) => trim(propertyStylePair, VALUES_TO_TRIM))
    .filter((propertyStylePair) => {
      if (contains(propertyStylePair, ':')) {
        return true;
      } else {
        // Don't make a fuss over empty strings as they could be trailing
        // semi-colons
        if (propertyStylePair !== '') {
          console.warn(
            `Invalid property-style pair provided to styleStringToMap ` +
            `"${propertyStylePair}"`);
        }
        return false;
      }
    })
    .map((propertyStylePair) => propertyStylePair.split(':'))
    .map((pair) => pair.map((value) => trim(value, VALUES_TO_TRIM)))
    .reduce(
      (result, [property, style]) => {
        result.set(property, style);
        return result;
      },
      new Map<string, string>());
}

export {styleStringToMap};
