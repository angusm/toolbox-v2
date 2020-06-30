"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameMemoize = void 0;
var multi_value_1 = require("./map/multi-value");
var render_loop_1 = require("./render-loop");
function clearCache(cache) {
    render_loop_1.renderLoop.cleanup(function () {
        cache.clear();
        render_loop_1.renderLoop.measure(function () { return clearCache(cache); });
    });
}
function frameMemoize(fn) {
    var cache = new multi_value_1.MultiValueMap();
    clearCache(cache);
    function frameMemoizedFn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (cache.has(args)) {
            return cache.get(args);
        }
        else {
            var result = fn.apply(void 0, args);
            cache.set(args, result);
            return result;
        }
    }
    return frameMemoizedFn;
}
exports.frameMemoize = frameMemoize;
//# sourceMappingURL=frame-memoize.js.map