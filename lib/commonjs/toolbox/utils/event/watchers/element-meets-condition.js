"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uid_iterator_1 = require("../../uid-iterator");
var render_loop_1 = require("../../render-loop");
var event_handler_1 = require("../event-handler");
var tb_event_1 = require("../events/tb-event");
var dynamic_default_1 = require("../../map/dynamic-default");
var uidMap = dynamic_default_1.DynamicDefaultMap
    .usingFunction(function () { return new uid_iterator_1.UidIterator(); });
var ElementMeetsConditionTracker = (function () {
    function ElementMeetsConditionTracker() {
        this.trackedElements_ = new Map();
        this.init_();
    }
    ElementMeetsConditionTracker.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.render_(); });
    };
    ElementMeetsConditionTracker.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            Array.from(_this.trackedElements_.values())
                .filter(function (el) { return _this.doesElementMeetCondition(el); })
                .forEach(function (el) {
                var EventClass = _this.getEventClass();
                return event_handler_1.eventHandler.dispatchEvent(new EventClass(el));
            });
        });
    };
    ElementMeetsConditionTracker.prototype.track = function (element) {
        var uid = uidMap.get(this.constructor).next().value;
        this.trackedElements_.set(uid, element);
        return uid;
    };
    ElementMeetsConditionTracker.prototype.untrack = function (uid) {
        return this.trackedElements_.delete(uid);
    };
    ElementMeetsConditionTracker.prototype.doesElementMeetCondition = function (e) {
        return false;
    };
    ElementMeetsConditionTracker.prototype.getEventClass = function () {
        return tb_event_1.TbEvent;
    };
    return ElementMeetsConditionTracker;
}());
exports.ElementMeetsConditionTracker = ElementMeetsConditionTracker;
//# sourceMappingURL=element-meets-condition.js.map