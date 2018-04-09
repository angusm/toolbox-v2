import {isVisible} from "../../dom/position/is-visible";
import {ElementMeetsConditionTracker} from "./element-meets-condition";
import {TbEvent} from "../events/tb-event";
import {IsVisible} from "../events/is-visible";

/**
 * Dispatches IsVisible events
 */
class IsVisibleTracker extends ElementMeetsConditionTracker {
  protected doesElementMeetCondition(element: HTMLElement): boolean {
    return isVisible(element);
  }

  protected getEventClass(): typeof TbEvent {
    return IsVisible;
  }
}

const isVisibleTracker = new IsVisibleTracker();
export {isVisibleTracker};