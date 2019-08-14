import {merge} from "../../utils/set/merge";
import {IDraggable} from "./interfaces";
import {translate2d} from "../../utils/dom/position/translate-2d";
import {Vector2d} from "../../utils/math/geometry/vector-2d";

class DraggableSyncManager {
  private static singleton_: DraggableSyncManager = null;
  private syncedDraggables_: Set<IDraggable>[];

  constructor() {
    this.syncedDraggables_ = [];
  }

  public static getSingleton(): DraggableSyncManager {
    return this.singleton_ = this.singleton_ || new this();
  }

  private getSetForDraggable_(draggable: IDraggable): Set<IDraggable>{
    return this.syncedDraggables_.find((set) => set.has(draggable));
  }

  public syncDraggables(...draggables: IDraggable[]) {
    const unchangedSets: Set<IDraggable>[] = [];
    const setsToMerge: Set<IDraggable>[] = [new Set(draggables)];
    this.syncedDraggables_
      .forEach(
        (draggableSet) => {
          if (draggables.find((draggable) => draggableSet.has(draggable))) {
            setsToMerge.push(draggableSet);
          } else {
            unchangedSets.push(draggableSet);
          }
        }
      );

    this.syncedDraggables_ = [...unchangedSets, merge(...setsToMerge)];
  }

  public renderDrag(draggable: IDraggable, delta: Vector2d) {
    const syncedDraggables = this.getSetForDraggable_(draggable);
    if (!syncedDraggables) {
      translate2d(draggable.getElement(), delta);
    } else {
      syncedDraggables.forEach((syncedDraggable) => {
        translate2d(syncedDraggable.getElement(), delta);
      });
    }
  }

  public destroyDraggable(draggable: IDraggable) {
    this.syncedDraggables_
      .forEach((draggableSet) => draggableSet.delete(draggable));
    this.syncedDraggables_ =
      this.syncedDraggables_
        .filter((draggableSet) => draggableSet.size > 0);
  }

  public destroy() {
    this.syncedDraggables_ = [];
  }
}

export {DraggableSyncManager};
