import { getContentInFirstSetOfParentheses } from "../../../string/get-content-in-first-set-of-parentheses";
import { validTransformStrings } from "./transform-value/valid-transform-strings";
import { transformStringToClass } from "./transform-value/transform-string-to-class";
import { trim } from "../../../string/trim";
import { ErrorService } from "../../../error/service";
var Transform = (function () {
    function Transform(transforms) {
        this.transformValues_ = transforms;
    }
    Transform.prototype.getTransformValues = function () {
        return this.transformValues_.slice();
    };
    Transform.prototype.getTransformValueClasses = function () {
        return this.transformValues_
            .map(function (transformValue) { return transformValue.constructor; });
    };
    Transform.fromStyleString = function (rawString) {
        var remainingString = rawString;
        var transforms = [];
        while (remainingString.length > 0) {
            var value = getContentInFirstSetOfParentheses(remainingString);
            var valueIndex = remainingString.indexOf(value);
            var transformFunction = remainingString.slice(0, valueIndex - 1);
            if (!validTransformStrings.has(transformFunction)) {
                ErrorService.throw("Unsupported transform function \"" + transformFunction + "\" provided to " +
                    "Toolbox Transform.");
            }
            var TransformClass = transformStringToClass.get(transformFunction);
            var fullTransformValue = remainingString.slice(0, valueIndex + value.length + 1);
            var transform = TransformClass.fromStyleString(fullTransformValue);
            transforms.push(transform);
            remainingString = trim(remainingString.slice(fullTransformValue.length));
        }
        return new Transform(transforms);
    };
    Transform.prototype.toStyleString = function () {
        return this.transformValues_
            .map(function (transform) { return transform.toStyleString(); })
            .join(' ');
    };
    return Transform;
}());
export { Transform };
//# sourceMappingURL=transform.js.map