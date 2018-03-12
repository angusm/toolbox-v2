import {zip} from './iterable/zip';

function createNamedTuple(...names: string[]): any {
  class NamedTuple {
    public constructor(...values: any[]) {
      if (names.length !== values.length) {
        console.error('Names and values length mismatch for named tuple');
      }

      Array.from(zip(names, values))
        .map((valuePairs) => Array.from(valuePairs))
        .forEach(
          ([name, value]) =>
            Object.defineProperty(this, name, {value: value, writable: false}));
    }
  }

  return NamedTuple;
}

export {createNamedTuple};
