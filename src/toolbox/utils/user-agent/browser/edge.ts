import {Browser, Offset} from "./base";

class Edge extends Browser {
  protected static name_: string = 'Edge';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Microsoft Edge', [['Microsoft Edge', 5]]]
    ];
}

export {Edge};
