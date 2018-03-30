import {getSubarraysOfLength} from '../array/get-subarrays-of-length';

function getSubstringsOfLength(value: string, length: number): string[] {
  return getSubarraysOfLength<string>(value.split(''), length)
    .map((substringLists) => substringLists.join(''));
}

export {getSubstringsOfLength};
