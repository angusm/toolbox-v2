import {DynamicDefaultMap} from '../../map/dynamic-default';
import {EventType} from '../../types';
import {builtIns} from './built-ins';
import {getEventString} from './get-event-string';

let uid: number = 0;
const uids: DynamicDefaultMap<EventType, string> =
  DynamicDefaultMap.usingFunction(
    (eventType: EventType) => {
      const eventString: string = getEventString(eventType);
      return builtIns.has(eventString) ? eventString : `CustomEvent_${uid++}`;
    });

export {uids};