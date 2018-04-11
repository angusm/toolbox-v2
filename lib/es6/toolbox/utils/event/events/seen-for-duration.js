var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TbEvent } from "./tb-event";
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { eventHandler } from "../event-handler";
import { IsVisible } from "./is-visible";
var SeenForDuration = (function (_super) {
    __extends(SeenForDuration, _super);
    function SeenForDuration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeenForDuration.getClassforDuration = function (threshold) {
        return this.classesByThreshold_.get(threshold);
    };
    SeenForDuration.getThreshold = function () {
        return this.msThreshold_;
    };
    SeenForDuration.createWatcher = function (target) {
        var _this = this;
        var uid = eventHandler.addListener(target, IsVisible, function () {
            eventHandler.removeListener(uid);
            setTimeout(function () {
                eventHandler.dispatchEvent(new _this(target));
            }, _this.getThreshold());
        });
        return function () { return eventHandler.removeListener(uid); };
    };
    SeenForDuration.classesByThreshold_ = DynamicDefaultMap.usingFunction(function (threshold) {
        var SeenForDurationChild = (function (_super) {
            __extends(SeenForDurationChild, _super);
            function SeenForDurationChild() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SeenForDurationChild.setThreshold = function (threshold) {
                if (this.msThreshold_ === 0) {
                    this.msThreshold_ = threshold;
                }
            };
            return SeenForDurationChild;
        }(SeenForDuration));
        SeenForDurationChild.setThreshold(threshold);
        return SeenForDurationChild;
    });
    SeenForDuration.msThreshold_ = 0;
    return SeenForDuration;
}(TbEvent));
export { SeenForDuration };
//# sourceMappingURL=seen-for-duration.js.map