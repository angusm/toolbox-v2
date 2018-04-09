import {MultiValueArrayMap} from '../map/multi-value-array';
import {TbEvent, ITbEventConstructor} from './events/tb-event';
import {getAncestorClasses} from '../inheritance/get-ancestor-classes';
import {UidIterator} from "../uid-iterator";

type Callback = (e: TbEvent) => void;
type ListenerKey = any | ITbEventConstructor;

class CallbackGroup {
  private target_: any;
  private EventClass_: ITbEventConstructor;
  private callback_: Callback;
  private destroy_: () => void;

  constructor(
    target: any,
    EventClass: ITbEventConstructor,
    callback: Callback,
    destroy: () => void
  ) {
    this.target_ = target;
    this.EventClass_ = EventClass;
    this.callback_ = callback;
    this.destroy_ = destroy;
  }

  public get target(): any {
    return this.target_;
  }

  public get EventClass(): ITbEventConstructor {
    return this.EventClass_;
  }

  public get callback(): Callback {
    return this.callback_;
  }

  public get destroy(): () => void {
    return this.destroy_;
  }
}

function getParentEvents(event: TbEvent): ITbEventConstructor[] {
  const LeafClass: ITbEventConstructor = <typeof TbEvent>event.constructor;
  return <ITbEventConstructor[]>[LeafClass, ...getAncestorClasses(LeafClass)];
}

const uids = new UidIterator();

class EventHandler {
  private listeners_: MultiValueArrayMap<ListenerKey, CallbackGroup>;
  private uidsToCallbackGroups_: Map<number, CallbackGroup>;

  constructor() {
    this.listeners_ = new MultiValueArrayMap<ListenerKey, CallbackGroup>();
    this.uidsToCallbackGroups_ = new Map<number, CallbackGroup>();
  }

  public addListener(
    target: any, EventClass: ITbEventConstructor, callback: Callback
  ): number {
    const destroyFn: () => void = EventClass.createWatcher(target);
    const cbGroup = new CallbackGroup(target, EventClass, callback, destroyFn);

    this.listeners_.get([target, EventClass]).push(cbGroup);

    const uid = uids.next().value;
    this.uidsToCallbackGroups_.set(uid, cbGroup);

    return uid;
  }

  public removeListener(uid: number): void {
    const cbGroup = this.uidsToCallbackGroups_.get(uid);
    this.uidsToCallbackGroups_.delete(uid);

    cbGroup.destroy();
    const callbacks: CallbackGroup[] =
      this.listeners_.get([cbGroup.target, cbGroup.EventClass]);
    callbacks.splice(callbacks.indexOf(cbGroup));
  }

  private getCallbacks(target: any, EventClass: ITbEventConstructor) {
    return this.listeners_.get([target, EventClass]);
  }

  public dispatchEvent(event: TbEvent): void {
    getParentEvents(event)
      .forEach(
        (EventClass) => {
          this.getCallbacks(event.getTarget(), EventClass)
            .forEach(
              (callbackGroup: CallbackGroup) => callbackGroup.callback(event));
        });
  }
}

const eventHandler: EventHandler = new EventHandler();

export {eventHandler};
