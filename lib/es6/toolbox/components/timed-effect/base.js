import { renderLoop } from "../../utils/render-loop";
var TimedEffect = (function () {
    function TimedEffect(target, duration, effectFunctions) {
        this.target_ = target;
        this.startTime_ = new Date().valueOf();
        this.endTime_ = this.startTime_ + duration;
        this.effectFunctions_ = effectFunctions;
        this.destroyed_ = false;
        this.init_();
    }
    TimedEffect.prototype.init_ = function () {
        this.render_();
    };
    TimedEffect.prototype.getTime_ = function () {
        return new Date().valueOf();
    };
    TimedEffect.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        if (this.getTime_() > this.endTime_) {
            this.runEffectFunctions_(1);
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            _this.runEffectFunctions_(_this.getPercent_());
        });
    };
    TimedEffect.prototype.getPercent_ = function () {
        return (this.getTime_() - this.startTime_) /
            (this.endTime_ - this.startTime_);
    };
    TimedEffect.prototype.runEffectFunctions_ = function (percent) {
        var _this = this;
        renderLoop.measure(function () {
            _this.effectFunctions_
                .forEach(function (effectFunction) { return effectFunction(_this.target_, percent); });
        });
    };
    TimedEffect.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return TimedEffect;
}());
export { TimedEffect };
//# sourceMappingURL=base.js.map