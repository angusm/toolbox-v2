goog.module('toolbox.is_def');var module = module || {id: 'toolbox/is-def.js'};

var is_defined_1 = goog.require('toolbox.is_defined');
function isDef(value) {
    console.warn("Toolbox's isDef is deprecated, please use the better named " +
        "isDefined instead");
    return is_defined_1.isDefined(value);
}
exports.isDef = isDef;
//# sourceMappingURL=is-def.js.map