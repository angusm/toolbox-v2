"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multi_value_array_1 = require("../map/multi-value-array");
var get_ancestor_classes_1 = require("../inheritance/get-ancestor-classes");
var uid = 0;
var EventHandler = (function () {
    function EventHandler() {
        this.listeners_ = new multi_value_array_1.MultiValueArrayMap();
        this.callbacks_ = new Map();
    }
    EventHandler.prototype.addListener = function (target, EventClass, callback) {
        var listenerId = uid++;
        this.listeners_.get([target, EventClass]).push(callback);
        this.callbacks_.set(listenerId, [target, EventClass, callback]);
        return listenerId;
    };
    EventHandler.prototype.removeListener = function (listenerId) {
        if (!this.callbacks_.has(listenerId)) {
            return;
        }
        var _a = this.callbacks_.get(listenerId), target = _a[0], EventClass = _a[1], callback = _a[2];
        var callbacks = this.listeners_.get([target, EventClass]);
        callbacks.splice(callbacks.indexOf(callback));
        this.callbacks_.delete(listenerId);
    };
    EventHandler.prototype.dispatchEvent = function (event) {
        var _this = this;
        var LeafClass = event.constructor;
        var AncestorClasses = [LeafClass].concat(get_ancestor_classes_1.getAncestorClasses(LeafClass));
        [LeafClass].concat(AncestorClasses).forEach(function (EventClass) {
            _this.listeners_
                .get([event.getTarget(), EventClass])
                .forEach(function (callback) { return callback(event); });
        });
    };
    return EventHandler;
}());
var eventHandler = new EventHandler();
exports.eventHandler = eventHandler;
//# sourceMappingURL=event-handler.js.map