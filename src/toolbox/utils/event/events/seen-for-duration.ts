import {TbEvent} from "./tb-event";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {eventHandler} from "../event-handler";
import {IsVisible} from "./is-visible";

class SeenForDuration extends TbEvent {
  private static classesByThreshold_:
    DynamicDefaultMap<number, typeof SeenForDuration> =
      DynamicDefaultMap.usingFunction<number, typeof SeenForDuration>(
        (threshold: number) => {

          class SeenForDurationChild extends SeenForDuration {
            public static setThreshold(threshold: number): void {
              if (this.msThreshold_ === 0) { // Set only once
                this.msThreshold_ = threshold;
              }
            }
          }
          SeenForDurationChild.setThreshold(threshold);

          return SeenForDurationChild;
        });

  protected static msThreshold_: number = 0;

  public static getClassforDuration(threshold: number): typeof SeenForDuration {
    return this.classesByThreshold_.get(threshold);
  }

  public static getThreshold(): number {
    return this.msThreshold_;
  }

  public static createWatcher(target: Element): () => void {
    const uid =
      eventHandler.addListener(
        target,
        IsVisible,
        () => {
          eventHandler.removeListener(uid);
          setTimeout(
            () => {
              eventHandler.dispatchEvent(new this(target));
            }, this.getThreshold())
        }
      );
    return () => eventHandler.removeListener(uid);
  }
}

export {SeenForDuration};
