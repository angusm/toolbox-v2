var RenderFunctionID = (function () {
    function RenderFunctionID(step) {
        this.step_ = step;
    }
    Object.defineProperty(RenderFunctionID.prototype, "step", {
        get: function () {
            return this.step_;
        },
        enumerable: false,
        configurable: true
    });
    return RenderFunctionID;
}());
export { RenderFunctionID };
//# sourceMappingURL=render-function-id.js.map