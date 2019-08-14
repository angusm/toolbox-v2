"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("../../utils/set/merge");
var translate_2d_1 = require("../../utils/dom/position/translate-2d");
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
        this.syncedDraggables_ = unchangedSets.concat([merge_1.merge.apply(void 0, setsToMerge)]);
    };
    DraggableSyncManager.prototype.renderDrag = function (draggable, delta) {
        var syncedDraggables = this.getSetForDraggable_(draggable);
        if (!syncedDraggables) {
            translate_2d_1.translate2d(draggable.getElement(), delta);
        }
        else {
            syncedDraggables.forEach(function (syncedDraggable) {
                translate_2d_1.translate2d(syncedDraggable.getElement(), delta);
            });
        }
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
exports.DraggableSyncManager = DraggableSyncManager;
//# sourceMappingURL=draggable-sync-manager.js.map