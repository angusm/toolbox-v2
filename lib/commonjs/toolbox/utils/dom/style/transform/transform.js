"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_content_in_first_set_of_parentheses_1 = require("../../../string/get-content-in-first-set-of-parentheses");
var valid_transform_strings_1 = require("./transform-value/valid-transform-strings");
var transform_string_to_class_1 = require("./transform-value/transform-string-to-class");
var trim_1 = require("../../../string/trim");
var service_1 = require("../../../error/service");
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
            var value = get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(remainingString);
            var valueIndex = remainingString.indexOf(value);
            var transformFunction = remainingString.slice(0, valueIndex - 1);
            if (!valid_transform_strings_1.validTransformStrings.has(transformFunction)) {
                service_1.ErrorService.throw("Unsupported transform function \"" + transformFunction + "\" provided to " +
                    "Toolbox Transform.");
            }
            var TransformClass = transform_string_to_class_1.transformStringToClass.get(transformFunction);
            var fullTransformValue = remainingString.slice(0, valueIndex + value.length + 1);
            var transform = TransformClass.fromStyleString(fullTransformValue);
            transforms.push(transform);
            remainingString = trim_1.trim(remainingString.slice(fullTransformValue.length));
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
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map