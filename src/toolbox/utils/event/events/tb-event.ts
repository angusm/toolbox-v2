import {noop} from "../../noop";
import {IEvent} from "../interfaces/tb-event";

class TbEvent implements IEvent{
  readonly target_: any;

  constructor(target: any) {
    this.target_ = target;
  }

  public getTarget(): any {
    return this.target_;
  }

  /**
   * Creates a watcher that will dispatch events for the target if necessary.
   * Not all events will need to have this implemented/overridden.
   * This is used for instance for tracking IsVisible on elements.
   * Returns a function that can be used to destroy the watcher (if necessary).
   */
  public static createWatcher(target: any): () => void {
    return noop;
  }
}

export {TbEvent};
