import { MultiValueArrayMap } from '../map/multi-value-array';
import { getAncestorClasses } from '../inheritance/get-ancestor-classes';
var uid = 0;
var EventHandler = (function () {
    function EventHandler() {
        this.listeners_ = new MultiValueArrayMap();
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
        var AncestorClasses = [LeafClass].concat(getAncestorClasses(LeafClass));
        [LeafClass].concat(AncestorClasses).forEach(function (EventClass) {
            _this.listeners_
                .get([event.getTarget(), EventClass])
                .forEach(function (callback) { return callback(event); });
        });
    };
    return EventHandler;
}());
var eventHandler = new EventHandler();
export { eventHandler };
//# sourceMappingURL=event-handler.js.map