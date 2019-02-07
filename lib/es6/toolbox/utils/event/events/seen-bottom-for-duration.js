var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TbEvent } from "./tb-event";
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { eventHandler } from "../event-handler";
import { IsBottomVisible } from "./is-bottom-visible";
var SeenBottomForDuration = (function (_super) {
    __extends(SeenBottomForDuration, _super);
    function SeenBottomForDuration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeenBottomForDuration.getClassforDuration = function (threshold) {
        return this.classesByThreshold_.get(threshold);
    };
    SeenBottomForDuration.getThreshold = function () {
        return this.msThreshold_;
    };
    SeenBottomForDuration.createWatcher = function (target) {
        var _this = this;
        var timeoutUid = -1;
        var uid = eventHandler.addListener(target, IsBottomVisible, function () {
            eventHandler.removeListener(uid);
            timeoutUid = setTimeout(function () {
                eventHandler.dispatchEvent(new _this(target));
            }, _this.getThreshold());
        });
        return function () {
            eventHandler.removeListener(uid);
            clearTimeout(timeoutUid);
        };
    };
    SeenBottomForDuration.classesByThreshold_ = DynamicDefaultMap.usingFunction(function (threshold) {
        var SeenBottomForDurationChild = (function (_super) {
            __extends(SeenBottomForDurationChild, _super);
            function SeenBottomForDurationChild() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SeenBottomForDurationChild.setThreshold = function (threshold) {
                if (this.msThreshold_ === 0) {
                    this.msThreshold_ = threshold;
                }
            };
            return SeenBottomForDurationChild;
        }(SeenBottomForDuration));
        SeenBottomForDurationChild.setThreshold(threshold);
        return SeenBottomForDurationChild;
    });
    SeenBottomForDuration.msThreshold_ = 0;
    return SeenBottomForDuration;
}(TbEvent));
export { SeenBottomForDuration };
//# sourceMappingURL=seen-bottom-for-duration.js.map