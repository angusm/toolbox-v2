import {getKeyValuePairs} from '../../object/get-key-value-pairs';

type StyleObject = {[s: string]: string};

function styleObjectToString(styleObject: StyleObject): string {
  const styles =
    getKeyValuePairs<string>(<{k: string}>styleObject)
      .map((kvp: [string, string]) => kvp.join(': '))
      .join('; ');
  return `${styles};`;
}

export {
  StyleObject,
  styleObjectToString
};
