import { SCROLL_ELEMENT } from '../../utils/dom/position/scroll-element';
import { setStyle } from '../../utils/dom/style/set-style';
var ScrollLockService = (function () {
    function ScrollLockService() {
        this.counter_ = 0;
    }
    ScrollLockService.getSingleton = function () {
        return (this.singleton = this.singleton || new this());
    };
    ScrollLockService.prototype.lockScroll = function () {
        if (this.counter_ === 0) {
            setStyle(SCROLL_ELEMENT, 'overflow', 'hidden');
        }
        this.counter_++;
    };
    ScrollLockService.prototype.unlockScroll = function () {
        if (this.counter_ === 1) {
            setStyle(SCROLL_ELEMENT, 'overflow', '');
        }
        else if (this.counter_ < 1) {
            throw new Error('You have tried to unlock the scroll more times than you have locked the scroll.');
        }
        this.counter_--;
    };
    return ScrollLockService;
}());
export { ScrollLockService };
//# sourceMappingURL=scroll-lock-service.js.map