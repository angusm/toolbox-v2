import {Browser, Offset} from "./base";

class Chrome extends Browser {
  protected static name_: string = 'Chrome';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Chrome', [['Chrome', 7]]]
    ];
}

export {Chrome};
