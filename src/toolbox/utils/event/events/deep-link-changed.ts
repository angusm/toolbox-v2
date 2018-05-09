import {TbEvent} from "./tb-event";
import {deepLinkChangedTracker} from "../watchers/deep-link-changed";

class DeepLinkChanged extends TbEvent {
  private deepLink_: string;

  constructor(target: any, deepLink: string) {
    super(target);
    this.deepLink_ = deepLink;
  }

  public static createWatcher(target: any): () => void {
    const uid = deepLinkChangedTracker.track(target);
    return () => {deepLinkChangedTracker.untrack(target, uid)};
  }
}

export {DeepLinkChanged};
