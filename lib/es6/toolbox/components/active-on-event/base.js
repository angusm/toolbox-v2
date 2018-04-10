import { renderLoop } from "../../utils/render-loop";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { eventHandler } from "../../utils/event/event-handler";
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
        renderLoop.measure(function () {
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            candidates.forEach(function (candidate) {
                eventHandler.addListener(candidate, _this.EventClass_, function () {
                    renderLoop.measure(function () {
                        var activeClass = _this.baseClass_ + "--" + _this.modifier_;
                        addClassIfMissing(candidate, activeClass);
                    });
                });
            });
        });
    };
    return ActiveOnEvent;
}());
export { ActiveOnEvent };
//# sourceMappingURL=base.js.map