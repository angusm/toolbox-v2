import {DynamicDefaultMap} from '../map/dynamic-default';
import {TbEvent} from "./events/tb-event";

let uid_: number = 0;
const uids: DynamicDefaultMap<typeof TbEvent, string> =
  DynamicDefaultMap.usingFunction<typeof TbEvent, string>(
    (eventType: typeof TbEvent) => `CustomEvent_${uid_++}`);

export {uids};
