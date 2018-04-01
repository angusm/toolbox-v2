import { defaultSymbol } from './default-symbol';
function runMapAsSwitch(map, key) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (map.has(key)) {
        return map.get(key).apply(void 0, args);
    }
    else {
        return map.get(defaultSymbol).apply(void 0, args);
    }
}
export { runMapAsSwitch };
//# sourceMappingURL=run-map-as-switch.js.map