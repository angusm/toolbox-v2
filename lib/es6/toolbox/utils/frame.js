import { renderLoop } from './render-loop';
var Frame = (function () {
    function Frame() {
        this.currentFrame = 0;
        this.render();
    }
    Frame.prototype.render = function () {
        var _this = this;
        renderLoop.framecount(function () {
            _this.currentFrame++;
            renderLoop.cleanup(function () { return _this.render(); });
        });
    };
    Frame.prototype.getFrame = function () {
        return this.currentFrame;
    };
    Frame.getSingleton = function () {
        return this.singleton || (this.singleton = new this());
    };
    Frame.singleton = null;
    return Frame;
}());
var frame = Frame.getSingleton();
export { frame };
//# sourceMappingURL=frame.js.map