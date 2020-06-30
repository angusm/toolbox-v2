var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { MultiValueArrayMap } from '../map/multi-value-array';
import { getAncestorClasses } from '../inheritance/get-ancestor-classes';
import { UidIterator } from "../uid-iterator";
var CallbackGroup = (function () {
    function CallbackGroup(target, EventClass, callback, destroy) {
        this.target_ = target;
        this.EventClass_ = EventClass;
        this.callback_ = callback;
        this.destroy_ = destroy;
    }
    Object.defineProperty(CallbackGroup.prototype, "target", {
        get: function () {
            return this.target_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CallbackGroup.prototype, "EventClass", {
        get: function () {
            return this.EventClass_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CallbackGroup.prototype, "callback", {
        get: function () {
            return this.callback_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CallbackGroup.prototype, "destroy", {
        get: function () {
            return this.destroy_;
        },
        enumerable: false,
        configurable: true
    });
    return CallbackGroup;
}());
function getParentEvents(event) {
    var LeafClass = event.constructor;
    return __spreadArrays([LeafClass], getAncestorClasses(LeafClass));
}
var uids = new UidIterator();
var EventHandler = (function () {
    function EventHandler() {
        this.listeners_ = new MultiValueArrayMap();
        this.uidsToCallbackGroups_ = new Map();
    }
    EventHandler.prototype.addListener = function (target, EventClass, callback) {
        var destroyFn = EventClass.createWatcher(target);
        var cbGroup = new CallbackGroup(target, EventClass, callback, destroyFn);
        this.listeners_.get([target, EventClass]).push(cbGroup);
        var uid = uids.next().value;
        this.uidsToCallbackGroups_.set(uid, cbGroup);
        return uid;
    };
    EventHandler.prototype.removeListener = function (uid) {
        var cbGroup = this.uidsToCallbackGroups_.get(uid);
        if (typeof cbGroup === 'undefined') {
            return;
        }
        this.uidsToCallbackGroups_.delete(uid);
        cbGroup.destroy();
        var callbacks = this.listeners_.get([cbGroup.target, cbGroup.EventClass]);
        callbacks.splice(callbacks.indexOf(cbGroup), 1);
    };
    EventHandler.prototype.getCallbacks = function (target, EventClass) {
        return this.listeners_.get([target, EventClass]);
    };
    EventHandler.prototype.dispatchEvent = function (event) {
        var _this = this;
        getParentEvents(event)
            .forEach(function (EventClass) {
            _this.getCallbacks(event.getTarget(), EventClass)
                .forEach(function (callbackGroup) { return callbackGroup.callback(event); });
        });
    };
    return EventHandler;
}());
var eventHandler = new EventHandler();
export { eventHandler };
//# sourceMappingURL=event-handler.js.map