goog.module('toolbox.run_map_as_switch');var module = module || {id: 'toolbox/run-map-as-switch.js'};

var default_symbol_1 = goog.require('toolbox.default_symbol');
function runMapAsSwitch(map, key) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (map.has(key)) {
        return map.get(key).apply(void 0, args);
    }
    else {
        return map.get(default_symbol_1.defaultSymbol).apply(void 0, args);
    }
}
exports.runMapAsSwitch = runMapAsSwitch;
//# sourceMappingURL=run-map-as-switch.js.map