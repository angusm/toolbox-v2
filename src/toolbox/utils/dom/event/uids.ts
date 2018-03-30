import {DynamicDefaultMap} from '../../map/dynamic-default';
import {builtIns} from './built-ins';
import {getSymbolString} from '../../symbol/get-symbol-string';

let uid: number = 0;
const uids: DynamicDefaultMap<symbol, string> =
  DynamicDefaultMap.usingFunction(
    (eventType: symbol) => {
      const eventString: string = getSymbolString(eventType);
      return builtIns.has(eventType) ? eventString : `CustomEvent_${uid++}`;
    });

export {uids};