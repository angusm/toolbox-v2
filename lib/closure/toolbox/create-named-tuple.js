goog.module('toolbox.create_named_tuple');var module = module || {id: 'toolbox/create-named-tuple.js'};

var zip_1 = goog.require('toolbox.iterable.zip');
function createNamedTuple() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var NamedTuple = (function () {
        function NamedTuple() {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            var _this = this;
            if (names.length !== values.length) {
                console.error('Names and values length mismatch for named tuple');
            }
            Array.from(zip_1.zip(names, values))
                .map(function (valuePairs) { return Array.from(valuePairs); })
                .forEach(function (_a) {
                var name = _a[0], value = _a[1];
                return Object.defineProperty(_this, name, { value: value, writable: false });
            });
        }
        return NamedTuple;
    }());
    return NamedTuple;
}
exports.createNamedTuple = createNamedTuple;
//# sourceMappingURL=create-named-tuple.js.map