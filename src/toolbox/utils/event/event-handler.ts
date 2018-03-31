const MultiValueArrayMap = require('../map/multi-value-array');
const getAncestorClasses = require('../inheritance/get-ancestor-classes');

let uid = 0;

class EventHandler {
  constructor() {
    this.listeners_ = new MultiValueArrayMap();
    this.callbacks_ = new Map();
  }

  addListener(target, EventClass, callback) {
    this.listeners_.get(target, EventClass).push(callback);
    const listenerId = uid++;
    this.callbacks_.set(listenerId, [target, EventClass, callback]);
    return listenerId;
  }

  removeListener(listenerId) {
    if (this.callbacks_.has(listenerId)) {
      const [target, EventClass, callback] = this.callbacks_.get(listenerId);
      const callbacks = this.listeners_.get(target, EventClass);
      callbacks.splice(callbacks.indexOf(callback));
      this.callbacks_.delete(listenerId);
    }
  }

  dispatchEvent(event) {
    const LeafClass = event.constructor;
    const AncestorClasses = [LeafClass, ...getAncestorClasses(LeafClass)];
    [LeafClass, ...AncestorClasses]
      .forEach(
        (EventClass) => {
          this.listeners_
            .get(event.getTarget(), EventClass)
            .forEach((callback) => callback(event));
        });
  }
}

module.exports = new EventHandler();
