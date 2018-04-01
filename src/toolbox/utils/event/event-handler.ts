import {MultiValueArrayMap} from '../map/multi-value-array';
import {TbEvent, ITbEventConstructor} from './tb-event';
import {getAncestorClasses} from '../inheritance/get-ancestor-classes';

type Callback = (e: TbEvent) => void;
type CallbackSet = [any, ITbEventConstructor, Callback];
type ListenerKey = any | ITbEventConstructor;

let uid: number = 0;

class EventHandler {
  private listeners_: MultiValueArrayMap<ListenerKey, Callback>;
  private callbacks_: Map<number, CallbackSet>;

  constructor() {
    this.listeners_ = new MultiValueArrayMap<ListenerKey, Callback>();
    this.callbacks_ = new Map<number, CallbackSet>();
  }

  public addListener(
    target: any, EventClass: ITbEventConstructor, callback: Callback
  ): number {
    const listenerId: number = uid++;
    this.listeners_.get([target, EventClass]).push(callback);
    this.callbacks_.set(listenerId, [target, EventClass, callback]);
    return listenerId;
  }

  public removeListener(listenerId: number): void {
    if (!this.callbacks_.has(listenerId)) {
      return;
    }
    const [target, EventClass, callback]: CallbackSet =
      this.callbacks_.get(listenerId);
    const callbacks: Callback[] = this.listeners_.get([target, EventClass]);
    callbacks.splice(callbacks.indexOf(callback));
    this.callbacks_.delete(listenerId);
  }

  public dispatchEvent(event: TbEvent): void {
    const LeafClass: ITbEventConstructor = <typeof TbEvent>event.constructor;
    const AncestorClasses = [LeafClass, ...getAncestorClasses(LeafClass)];
    [LeafClass, ...AncestorClasses]
      .forEach(
        (EventClass) => {
          this.listeners_
            .get([event.getTarget(), EventClass])
            .forEach((callback) => callback(event));
        });
  }
}

const eventHandler: EventHandler = new EventHandler();

export {eventHandler};
