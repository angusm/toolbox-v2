import {Browser, Offset} from "./base";

class Safari extends Browser {
  protected static name_: string = 'Safari';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Safari', [['Version', 8], ['Safari', 7]]]
    ];
}

export {Safari};
