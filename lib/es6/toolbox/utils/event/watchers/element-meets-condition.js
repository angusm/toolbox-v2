import { UidIterator } from "../../uid-iterator";
import { renderLoop } from "../../render-loop";
import { eventHandler } from "../event-handler";
import { TbEvent } from "../events/tb-event";
import { DynamicDefaultMap } from "../../map/dynamic-default";
var uidMap = DynamicDefaultMap
    .usingFunction(function () { return new UidIterator(); });
var ElementMeetsConditionTracker = (function () {
    function ElementMeetsConditionTracker() {
        this.trackedElements_ = new Map();
        this.init_();
    }
    ElementMeetsConditionTracker.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () { return _this.render_(); });
    };
    ElementMeetsConditionTracker.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            Array.from(new Set(_this.trackedElements_.values()))
                .filter(function (el) { return _this.doesElementMeetCondition(el); })
                .forEach(function (el) {
                var EventClass = _this.getEventClass();
                return eventHandler.dispatchEvent(new EventClass(el));
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
        return TbEvent;
    };
    return ElementMeetsConditionTracker;
}());
export { ElementMeetsConditionTracker };
//# sourceMappingURL=element-meets-condition.js.map