"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tb_event_1 = require("./tb-event");
var dynamic_default_1 = require("../../map/dynamic-default");
var event_handler_1 = require("../event-handler");
var is_bottom_visible_1 = require("./is-bottom-visible");
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
        var uid = event_handler_1.eventHandler.addListener(target, is_bottom_visible_1.IsBottomVisible, function () {
            event_handler_1.eventHandler.removeListener(uid);
            timeoutUid = setTimeout(function () {
                event_handler_1.eventHandler.dispatchEvent(new _this(target));
            }, _this.getThreshold());
        });
        return function () {
            event_handler_1.eventHandler.removeListener(uid);
            clearTimeout(timeoutUid);
        };
    };
    SeenBottomForDuration.classesByThreshold_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function (threshold) {
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
}(tb_event_1.TbEvent));
exports.SeenBottomForDuration = SeenBottomForDuration;
//# sourceMappingURL=seen-bottom-for-duration.js.map