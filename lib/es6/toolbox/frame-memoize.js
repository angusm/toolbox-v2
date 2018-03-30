import { MultiValueMap } from './map/multi-value';
import { renderLoop } from './render-loop';
function clearCache(cache) {
    renderLoop.cleanup(function () {
        cache.clear();
        renderLoop.measure(function () { return clearCache(cache); });
    });
}
function frameMemoize(fn) {
    var cache = new MultiValueMap();
    clearCache(cache);
    function frameMemoizedFn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (cache.has.apply(cache, args)) {
            return cache.get.apply(cache, args);
        }
        else {
            var result = fn.apply(void 0, args);
            cache.set.apply(cache, args.concat([result]));
            return result;
        }
    }
    return frameMemoizedFn;
}
export { frameMemoize };
//# sourceMappingURL=frame-memoize.js.map