import {TbEvent} from "./tb-event";
import {isVisibleTracker} from "../watchers/is-visible";

class IsVisible extends TbEvent {
  public static createWatcher(target: any): () => void {
    const trackerUid: number = isVisibleTracker.track(<HTMLElement>target);
    return () => {isVisibleTracker.untrack(trackerUid)};
  }
}

export {IsVisible};
