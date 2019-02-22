import {TbEvent} from "./tb-event";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {eventHandler} from "../event-handler";
import {IsBottomVisible} from "./is-bottom-visible";

// TODO(Angus): Consolidate this and SeenForDuration

class SeenBottomForDuration extends TbEvent {
  private static classesByThreshold_:
    DynamicDefaultMap<number, typeof SeenBottomForDuration> =
      DynamicDefaultMap.usingFunction<number, typeof SeenBottomForDuration>(
        (threshold: number) => {

          class SeenBottomForDurationChild extends SeenBottomForDuration {
            public static setThreshold(threshold: number): void {
              if (this.msThreshold_ === 0) { // Set only once
                this.msThreshold_ = threshold;
              }
            }
          }
          SeenBottomForDurationChild.setThreshold(threshold);

          return SeenBottomForDurationChild;
        });

  protected static msThreshold_: number = 0;

  public static getClassforDuration(threshold: number): typeof SeenBottomForDuration {
    return this.classesByThreshold_.get(threshold);
  }

  public static getThreshold(): number {
    return this.msThreshold_;
  }

  public static createWatcher(target: Element): () => void {
    let timeoutUid: number = -1;
    const uid: number =
      eventHandler.addListener(
        target,
        IsBottomVisible,
        () => {
          eventHandler.removeListener(uid);
          timeoutUid = window.setTimeout(
            () => {
              eventHandler.dispatchEvent(new this(target));
            }, this.getThreshold())
        }
      );
    return () => {
      eventHandler.removeListener(uid);
      clearTimeout(timeoutUid);
    };
  }
}

export {SeenBottomForDuration};
