import { zip } from './iterable/zip';
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
            zip(names, values).forEach(function (_a) {
                var name = _a[0], value = _a[1];
                return _this[name] = value;
            });
        }
        return NamedTuple;
    }());
    return NamedTuple;
}
export { createNamedTuple };
//# sourceMappingURL=create-named-tuple.js.map