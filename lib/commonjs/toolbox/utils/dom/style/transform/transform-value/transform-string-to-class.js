"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformStringToClass = void 0;
var matrix_1 = require("./matrix");
var matrix3d_1 = require("./matrix3d");
var translate_1 = require("./translate");
var translate_x_1 = require("./translate-x");
var translate_y_1 = require("./translate-y");
var translate_z_1 = require("./translate-z");
var translate_3d_1 = require("./translate-3d");
var scale_1 = require("./scale");
var scale_x_1 = require("./scale-x");
var scale_y_1 = require("./scale-y");
var scale_z_1 = require("./scale-z");
var scale_3d_1 = require("./scale-3d");
var rotate_1 = require("./rotate");
var rotate_x_1 = require("./rotate-x");
var rotate_y_1 = require("./rotate-y");
var rotate_z_1 = require("./rotate-z");
var rotate_3d_1 = require("./rotate-3d");
var skew_1 = require("./skew");
var skew_x_1 = require("./skew-x");
var skew_y_1 = require("./skew-y");
var transformStringToClass = new Map([
    ['matrix', matrix_1.Matrix],
    ['matrix3d', matrix3d_1.Matrix3d],
    ['translate', translate_1.Translate],
    ['translateX', translate_x_1.TranslateX],
    ['translateY', translate_y_1.TranslateY],
    ['translateZ', translate_z_1.TranslateZ],
    ['translate3d', translate_3d_1.Translate3d],
    ['scale', scale_1.Scale],
    ['scaleX', scale_x_1.ScaleX],
    ['scaleY', scale_y_1.ScaleY],
    ['scaleZ', scale_z_1.ScaleZ],
    ['scale3d', scale_3d_1.Scale3d],
    ['rotate', rotate_1.Rotate],
    ['rotateX', rotate_x_1.RotateX],
    ['rotateY', rotate_y_1.RotateY],
    ['rotateZ', rotate_z_1.RotateZ],
    ['rotate3d', rotate_3d_1.Rotate3d],
    ['skew', skew_1.Skew],
    ['skewX', skew_x_1.SkewX],
    ['skewY', skew_y_1.SkewY],
]);
exports.transformStringToClass = transformStringToClass;
//# sourceMappingURL=transform-string-to-class.js.map