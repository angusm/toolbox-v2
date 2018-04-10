import {TbEvent} from "./tb-event";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {eventHandler} from "../event-handler";
import {IsVisible} from "./is-visible";

class SeenForXMs extends TbEvent {
  private static classesByThreshold_:
    DynamicDefaultMap<number, typeof SeenForXMs> =
      DynamicDefaultMap.usingFunction<number, typeof SeenForXMs>(
        (threshold: number) => {

          class SeenForXMsChild extends SeenForXMs {
            public static setThreshold(threshold: number): void {
              if (this.msThreshold_ === 0) { // Set only once
                this.msThreshold_ = threshold;
              }
            }
          }
          SeenForXMsChild.setThreshold(threshold);

          return SeenForXMsChild;
        });

  protected static msThreshold_: number = 0;

  public static getClassForXMs(threshold: number): typeof SeenForXMs {
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

export {SeenForXMs};
