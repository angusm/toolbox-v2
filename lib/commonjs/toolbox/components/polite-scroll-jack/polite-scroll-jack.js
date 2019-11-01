"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var on_dom_content_load_1 = require("../../utils/dom/on-dom-content-load");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var polite_scroll_jack_coordinator_1 = require("./polite-scroll-jack-coordinator");
var PoliteScrollJack = (function () {
    function PoliteScrollJack(targets, _a) {
        var _b = (_a === void 0 ? {} : _a).scrollContainer, scrollContainer = _b === void 0 ? scroll_element_1.SCROLL_ELEMENT : _b;
        this.coordinator_ =
            polite_scroll_jack_coordinator_1.PoliteScrollJackCoordinator.getSingleton(scrollContainer);
        this.targets_ = targets;
    }
    PoliteScrollJack.fireAndForget = function (targets, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(targets, options);
        var _ignoredPromise = on_dom_content_load_1.onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        this.coordinator_.registerElements(this.targets_);
    };
    PoliteScrollJack.prototype.destroy = function () {
        this.coordinator_.deregisterElements(this.targets_);
    };
    return PoliteScrollJack;
}());
exports.PoliteScrollJack = PoliteScrollJack;
//# sourceMappingURL=polite-scroll-jack.js.map