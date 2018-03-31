import {getAsList} from './get-as-list';
import {zip} from '../array/zip';

function getKeyValuePairs<V>(value: any): [string, V][] {
  return <[string, V][]>zip<string|V>(Object.keys(value), getAsList<V>(value));
}

export {getKeyValuePairs};
