
import {UidIterator} from "../../uid-iterator";
import {renderLoop} from "../../render-loop";
import {isVisible} from "../../dom/position/is-visible";
import {eventHandler} from "../event-handler";
import {IsVisible} from "../events/is-visible";
import {ITbEventConstructor, TbEvent} from "../events/tb-event";
import {DynamicDefaultMap} from "../../map/dynamic-default";

/**
 * Dispatches events for an element when it meets a condition
 */

const uidMap =
  DynamicDefaultMap
    .usingFunction<Function, UidIterator>(() => new UidIterator());

abstract class ElementMeetsConditionTracker {
  private trackedElements_: Map<number, HTMLElement>;

  constructor() {
    this.trackedElements_ = new Map<number, HTMLElement>();
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => this.render_);
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      Array.from(this.trackedElements_.values())
        .filter((el: HTMLElement) => this.doesElementMeetCondition(el))
        .forEach(
          (el: HTMLElement) => {
            const EventClass: typeof TbEvent = this.getEventClass();
            return eventHandler.dispatchEvent(new EventClass(el))
          });
    });
  }

  public track(element: HTMLElement): number {
    const uid: number = uidMap.get(this.constructor).next().value;
    this.trackedElements_.set(uid, element);
    return uid;
  }

  public untrack(uid: number) {
    return this.trackedElements_.delete(uid);
  }

  protected doesElementMeetCondition(e: HTMLElement): boolean {
    return false;
  }

  protected getEventClass(): typeof TbEvent {
    return TbEvent;
  }
}

export {ElementMeetsConditionTracker};