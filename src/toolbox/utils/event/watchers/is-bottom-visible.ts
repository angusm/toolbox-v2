import {isBottomVisible} from "../../dom/position/is-bottom-visible";
import {ElementMeetsConditionTracker} from "./element-meets-condition";
import {TbEvent} from "../events/tb-event";
import {IsBottomVisible} from "../events/is-bottom-visible";

/**
 * Dispatches IsBottomVisible events
 */
class IsBottomVisibleTracker extends ElementMeetsConditionTracker {
  protected doesElementMeetCondition(element: HTMLElement): boolean {
    return isBottomVisible(element);
  }

  protected getEventClass(): typeof TbEvent{
    return IsBottomVisible;
  }
}

const isBottomVisibleTracker = new IsBottomVisibleTracker();
export {isBottomVisibleTracker};