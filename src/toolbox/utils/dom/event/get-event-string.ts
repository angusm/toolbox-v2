import {EventType} from '../../types';
import {builtIns} from './built-ins';
import {getSymbolString} from '../../symbol/get-symbol-string';

function getEventString(eventType: EventType) {
  return builtIns.has(eventType) ? eventType : getSymbolString(<symbol>eventType);
}

export {getEventString};
