import {ICarousel} from "./interfaces";
import {merge} from "../../utils/set/merge";

class CarouselSyncManager {
  private static singleton_: CarouselSyncManager = null;
  private syncedCarousels_: Set<ICarousel>[];

  constructor() {
    this.syncedCarousels_ = [];
  }

  public static getSingleton(): CarouselSyncManager {
    return this.singleton_ = this.singleton_ || new this();
  }

  private getSetForCarousel_(carousel: ICarousel): Set<ICarousel>{
    return this.syncedCarousels_.find((set) => set.has(carousel));
  }

  public syncCarousels(...carousels: ICarousel[]) {
    const unchangedSets: Set<ICarousel>[] = [];
    const setsToMerge: Set<ICarousel>[] = [new Set(carousels)];
    this.syncedCarousels_
      .forEach(
        (carouselSet) => {
          if (carousels.find((carousel) => carouselSet.has(carousel))) {
            setsToMerge.push(carouselSet);
          } else {
            unchangedSets.push(carouselSet);
          }
        }
      );

    this.syncedCarousels_ = [...unchangedSets, merge(...setsToMerge)];
  }

  public transitionToIndex(carousel: ICarousel, index: number) {
    const syncedCarousels = this.getSetForCarousel_(carousel);
    if (!syncedCarousels) {
      return;
    }
    Array.from(syncedCarousels)
      .filter((syncedCarousel) => syncedCarousel !== carousel)
      .forEach(
        (syncedCarousel) => syncedCarousel.transitionToIndex(index, false));
  }
}

export {CarouselSyncManager};
