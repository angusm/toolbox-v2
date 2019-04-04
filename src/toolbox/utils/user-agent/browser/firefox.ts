import {Browser, Offset} from "./base";
import {contains} from "../../string/contains";
import {USER_AGENT_STRING} from "../string";

class Firefox extends Browser {
  protected static name_: string = 'Firefox';
  protected static uaidsWithOffsets_: [string, Offset[]][] =
    [
      ['Firefox', [['Firefox', 8]]]
    ];

  public static getVersion(): number {
    return parseFloat(USER_AGENT_STRING.split('Firefox/')[1].split(' ')[0]);
  }
}

export {Firefox};
