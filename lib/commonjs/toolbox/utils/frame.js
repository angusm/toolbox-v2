"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("./render-loop");
var Frame = (function () {
    function Frame() {
        this.currentFrame = 0;
        this.render();
    }
    Frame.prototype.render = function () {
        var _this = this;
        render_loop_1.renderLoop.framecount(function () {
            _this.currentFrame++;
            render_loop_1.renderLoop.cleanup(function () { return _this.render(); });
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
exports.frame = frame;
//# sourceMappingURL=frame.js.map