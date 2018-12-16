import {Browser, Offset} from "./base";

class Edge extends Browser {
  protected static name_: string = 'Edge';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Edge', [['Edge', 5]]]
    ];
}

export {Edge};
