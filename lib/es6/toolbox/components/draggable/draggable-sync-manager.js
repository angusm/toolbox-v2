var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { merge } from "../../utils/set/merge";
import { translate2d } from "../../utils/dom/position/translate-2d";
var DraggableSyncManager = (function () {
    function DraggableSyncManager() {
        this.syncedDraggables_ = [];
    }
    DraggableSyncManager.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    DraggableSyncManager.prototype.getSetForDraggable_ = function (draggable) {
        return this.syncedDraggables_.find(function (set) { return set.has(draggable); });
    };
    DraggableSyncManager.prototype.syncDraggables = function () {
        var draggables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            draggables[_i] = arguments[_i];
        }
        var unchangedSets = [];
        var setsToMerge = [new Set(draggables)];
        this.syncedDraggables_
            .forEach(function (draggableSet) {
            if (draggables.find(function (draggable) { return draggableSet.has(draggable); })) {
                setsToMerge.push(draggableSet);
            }
            else {
                unchangedSets.push(draggableSet);
            }
        });
        this.syncedDraggables_ = __spreadArrays(unchangedSets, [merge.apply(void 0, setsToMerge)]);
    };
    DraggableSyncManager.prototype.renderDrag = function (draggable, delta) {
        var syncedDraggables = this.getSetForDraggable_(draggable);
        if (!syncedDraggables) {
            translate2d(draggable.getElement(), delta);
        }
        syncedDraggables.forEach(function (syncedDraggable) {
            translate2d(syncedDraggable.getElement(), delta);
        });
    };
    DraggableSyncManager.prototype.destroyDraggable = function (draggable) {
        this.syncedDraggables_
            .forEach(function (draggableSet) { return draggableSet.delete(draggable); });
        this.syncedDraggables_ =
            this.syncedDraggables_
                .filter(function (draggableSet) { return draggableSet.size > 0; });
    };
    DraggableSyncManager.prototype.destroy = function () {
        this.syncedDraggables_ = [];
    };
    DraggableSyncManager.singleton_ = null;
    return DraggableSyncManager;
}());
export { DraggableSyncManager };
//# sourceMappingURL=draggable-sync-manager.js.map