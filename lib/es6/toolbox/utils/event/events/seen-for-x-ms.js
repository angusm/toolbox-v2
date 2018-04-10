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
var SeenForXMs = (function (_super) {
    __extends(SeenForXMs, _super);
    function SeenForXMs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeenForXMs.getClassForXMs = function (threshold) {
        return this.classesByThreshold_.get(threshold);
    };
    SeenForXMs.getThreshold = function () {
        return this.msThreshold_;
    };
    SeenForXMs.createWatcher = function (target) {
        var _this = this;
        var uid = eventHandler.addListener(target, IsVisible, function () {
            eventHandler.removeListener(uid);
            setTimeout(function () {
                eventHandler.dispatchEvent(new _this(target));
            }, _this.getThreshold());
        });
        return function () { return eventHandler.removeListener(uid); };
    };
    SeenForXMs.classesByThreshold_ = DynamicDefaultMap.usingFunction(function (threshold) {
        var SeenForXMsChild = (function (_super) {
            __extends(SeenForXMsChild, _super);
            function SeenForXMsChild() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SeenForXMsChild.setThreshold = function (threshold) {
                if (this.msThreshold_ === 0) {
                    this.msThreshold_ = threshold;
                }
            };
            return SeenForXMsChild;
        }(SeenForXMs));
        SeenForXMsChild.setThreshold(threshold);
        return SeenForXMsChild;
    });
    SeenForXMs.msThreshold_ = 0;
    return SeenForXMs;
}(TbEvent));
export { SeenForXMs };
//# sourceMappingURL=seen-for-x-ms.js.map