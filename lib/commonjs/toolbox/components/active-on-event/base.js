"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var event_handler_1 = require("../../utils/event/event-handler");
var MODIFIER = 'active';
var ActiveOnEvent = (function () {
    function ActiveOnEvent(baseClass, EventClass, modifier) {
        if (modifier === void 0) { modifier = MODIFIER; }
        this.baseClass_ = baseClass;
        this.EventClass_ = EventClass;
        this.modifier_ = modifier;
        this.init_();
    }
    ActiveOnEvent.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            candidates.forEach(function (candidate) {
                event_handler_1.eventHandler.addListener(candidate, _this.EventClass_, function () {
                    render_loop_1.renderLoop.measure(function () {
                        var activeClass = _this.baseClass_ + "--" + _this.modifier_;
                        add_class_if_missing_1.addClassIfMissing(candidate, activeClass);
                    });
                });
            });
        });
    };
    return ActiveOnEvent;
}());
exports.ActiveOnEvent = ActiveOnEvent;
//# sourceMappingURL=base.js.map