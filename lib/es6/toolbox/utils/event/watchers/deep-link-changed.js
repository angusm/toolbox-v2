import { renderLoop } from "../../render-loop";
import { eventHandler } from "../event-handler";
import { DeepLinkChanged } from "../events/deep-link-changed";
import { DynamicDefaultMap } from "../../map/dynamic-default";
var DeepLinkChangedTracker = (function () {
    function DeepLinkChangedTracker() {
        this.uid_ = 0;
        this.watchers_ =
            DynamicDefaultMap
                .usingFunction(function () { return new Set(); });
        this.previousHashes_ = new Map();
    }
    DeepLinkChangedTracker.prototype.render_ = function () {
        var _this = this;
        if (!this.isTracking_()) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var targets = _this.watchers_.keys();
            Array.from(targets)
                .forEach(function (target) {
                var newHash = target.location.hash;
                if (_this.previousHashes_.has(target) &&
                    newHash != _this.previousHashes_.get(target)) {
                    eventHandler.dispatchEvent(new DeepLinkChanged(target, newHash));
                }
                _this.previousHashes_.set(target, newHash);
            });
        });
    };
    DeepLinkChangedTracker.prototype.isTracking_ = function () {
        return Array.from(this.watchers_.values()).some(function (s) { return s.size > 0; });
    };
    DeepLinkChangedTracker.prototype.track = function (target) {
        var isTracking = this.isTracking_();
        var uid = Symbol(this.uid_++);
        var uids = this.watchers_.get(target);
        uids.add(uid);
        if (!isTracking) {
            this.render_();
        }
        return uid;
    };
    DeepLinkChangedTracker.prototype.untrack = function (target, uid) {
        var uids = this.watchers_.get(target);
        uids.delete(uid);
        if (!uids.size) {
            this.watchers_.delete(target);
            this.previousHashes_.delete(target);
        }
    };
    return DeepLinkChangedTracker;
}());
var deepLinkChangedTracker = new DeepLinkChangedTracker();
export { deepLinkChangedTracker };
//# sourceMappingURL=deep-link-changed.js.map