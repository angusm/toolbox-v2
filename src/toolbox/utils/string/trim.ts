import {lstrip} from './lstrip';
import {rstrip} from './rstrip';

function trim(value: string, characters: string[] = [' ']): string {
  return lstrip(rstrip(value, characters), characters);
}

export {trim};
