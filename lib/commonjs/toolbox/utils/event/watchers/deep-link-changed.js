"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
var event_handler_1 = require("../event-handler");
var deep_link_changed_1 = require("../events/deep-link-changed");
var dynamic_default_1 = require("../../map/dynamic-default");
var DeepLinkChangedTracker = (function () {
    function DeepLinkChangedTracker() {
        this.uid_ = 0;
        this.watchers_ =
            dynamic_default_1.DynamicDefaultMap
                .usingFunction(function () { return new Set(); });
        this.previousHashes_ = new Map();
    }
    DeepLinkChangedTracker.prototype.render_ = function () {
        var _this = this;
        if (!this.isTracking_()) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var targets = _this.watchers_.keys();
            Array.from(targets)
                .forEach(function (target) {
                var newHash = target.location.hash;
                if (_this.previousHashes_.has(target) &&
                    newHash != _this.previousHashes_.get(target)) {
                    event_handler_1.eventHandler.dispatchEvent(new deep_link_changed_1.DeepLinkChanged(target, newHash));
                }
                _this.previousHashes_.set(target, newHash);
            });
        });
    };
    DeepLinkChangedTracker.prototype.isTracking_ = function () {
        return Array.from(this.watchers_.keys()).some(function (s) { return s.size; });
    };
    DeepLinkChangedTracker.prototype.track = function (target) {
        if (!this.isTracking_()) {
            this.render_();
        }
        var uid = Symbol(this.uid_++);
        var uids = this.watchers_.get(target);
        uids.add(uid);
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
exports.deepLinkChangedTracker = deepLinkChangedTracker;
//# sourceMappingURL=deep-link-changed.js.map