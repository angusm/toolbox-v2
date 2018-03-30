import {lstrip} from './lstrip';
import {rstrip} from './rstrip';

function trim(value: string): string {
  return lstrip(rstrip(value));
}

export {trim};
