import {TbEvent} from "./tb-event";
import {isBottomVisibleTracker} from "../watchers/is-bottom-visible";

class IsBottomVisible extends TbEvent {
  public static createWatcher(target: any): () => void {
    const trackerUid: number = isBottomVisibleTracker.track(<HTMLElement>target);
    return () => {isBottomVisibleTracker.untrack(trackerUid)};
  }
}

export {IsBottomVisible};
