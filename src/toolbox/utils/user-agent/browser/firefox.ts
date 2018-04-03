import {Browser, Offset} from "./base";

class Firefox extends Browser {
  protected static name_: string = 'Firefox';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Firefox', [['Firefox', 8]]]
    ];
}

export {Firefox};
