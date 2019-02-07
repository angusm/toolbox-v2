"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("../../utils/set/merge");
var CarouselSyncManager = (function () {
    function CarouselSyncManager() {
        this.syncedCarousels_ = [];
    }
    CarouselSyncManager.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    CarouselSyncManager.prototype.getSetForCarousel_ = function (carousel) {
        return this.syncedCarousels_.find(function (set) { return set.has(carousel); });
    };
    CarouselSyncManager.prototype.syncCarousels = function () {
        var carousels = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            carousels[_i] = arguments[_i];
        }
        var unchangedSets = [];
        var setsToMerge = [new Set(carousels)];
        this.syncedCarousels_
            .forEach(function (carouselSet) {
            if (carousels.find(function (carousel) { return carouselSet.has(carousel); })) {
                setsToMerge.push(carouselSet);
            }
            else {
                unchangedSets.push(carouselSet);
            }
        });
        this.syncedCarousels_ = unchangedSets.concat([merge_1.merge.apply(void 0, setsToMerge)]);
    };
    CarouselSyncManager.prototype.transitionToIndex = function (carousel, index) {
        var syncedCarousels = this.getSetForCarousel_(carousel);
        if (!syncedCarousels) {
            return;
        }
        Array.from(syncedCarousels)
            .filter(function (syncedCarousel) { return syncedCarousel !== carousel; })
            .forEach(function (syncedCarousel) { return syncedCarousel.transitionToIndex(index, false); });
    };
    CarouselSyncManager.singleton_ = null;
    return CarouselSyncManager;
}());
exports.CarouselSyncManager = CarouselSyncManager;
//# sourceMappingURL=sync-manager.js.map