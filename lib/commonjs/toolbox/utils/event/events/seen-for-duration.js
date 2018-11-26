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
var is_visible_1 = require("./is-visible");
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
        var uid = event_handler_1.eventHandler.addListener(target, is_visible_1.IsVisible, function () {
            event_handler_1.eventHandler.removeListener(uid);
            setTimeout(function () {
                event_handler_1.eventHandler.dispatchEvent(new _this(target));
            }, _this.getThreshold());
        });
        return function () { return event_handler_1.eventHandler.removeListener(uid); };
    };
    SeenForDuration.classesByThreshold_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function (threshold) {
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
}(tb_event_1.TbEvent));
exports.SeenForDuration = SeenForDuration;
//# sourceMappingURL=seen-for-duration.js.map