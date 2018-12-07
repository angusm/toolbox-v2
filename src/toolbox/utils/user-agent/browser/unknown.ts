import {Browser, Offset} from "./base";

class UnknownBrowser extends Browser {
  protected static name_: string = 'UnknownBrowser';
  protected static uaidsWithOffsets_: [string, Offset[]][] = [];
}

export {UnknownBrowser};
