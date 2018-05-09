import {renderLoop} from "../../render-loop";
import {eventHandler} from "../event-handler";
import {DeepLinkChanged} from "../events/deep-link-changed";
import {DynamicDefaultMap} from "../../map/dynamic-default";

/**
 * Dispatches IsBottomVisible events
 */
class DeepLinkChangedTracker {
  private uid_: number;
  private watchers_: DynamicDefaultMap<any, Set<symbol>>;
  private previousHashes_: Map<any, string>;

  constructor() {
    this.uid_ = 0;
    this.watchers_ =
      DynamicDefaultMap
        .usingFunction<any, Set<symbol>>(() => new Set<symbol>());
    this.previousHashes_ = new Map<any, string>();
  }

  private render_() {
    if (!this.isTracking_()) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());
      const targets = this.watchers_.keys();
      Array.from(targets)
        .forEach((target) => {
            const newHash = target.location.hash;

            if (
              this.previousHashes_.has(target) &&
              newHash != this.previousHashes_.get(target)
            ) {
              eventHandler.dispatchEvent(new DeepLinkChanged(target, newHash));
            }
            this.previousHashes_.set(target, newHash);
          });
        });
  }

  private isTracking_(): boolean {
    return Array.from(this.watchers_.values()).some((s) => s.size > 0);
  }

  public track(target: any): symbol {
    const isTracking = this.isTracking_();
    const uid = Symbol(this.uid_++);
    const uids = this.watchers_.get(target);
    uids.add(uid);

    // Start the render loop if it's not been running previously
    if (!isTracking) {
      this.render_();
    }

    return uid;
  }

  public untrack(target: any, uid: symbol) {
    const uids = this.watchers_.get(target);
    uids.delete(uid);
    if (!uids.size) {
      this.watchers_.delete(target);
      this.previousHashes_.delete(target);
    }
  }
}

const deepLinkChangedTracker = new DeepLinkChangedTracker();
export {deepLinkChangedTracker};