"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blur_1 = require("./blur");
var brightness_1 = require("./brightness");
var grayscale_1 = require("./grayscale");
var contrast_1 = require("./contrast");
var drop_shadow_1 = require("./drop-shadow");
var invert_1 = require("./invert");
var opacity_1 = require("./opacity");
var saturate_1 = require("./saturate");
var sepia_1 = require("./sepia");
var hue_rotate_1 = require("./hue-rotate");
var filterStringToClass = new Map([
    ['blur', blur_1.Blur],
    ['brightness', brightness_1.Brightness],
    ['contrast', contrast_1.Contrast],
    ['drop-shadow', drop_shadow_1.DropShadow],
    ['grayscale', grayscale_1.Grayscale],
    ['hue-rotate', hue_rotate_1.HueRotate],
    ['invert', invert_1.Invert],
    ['opacity', opacity_1.Opacity],
    ['saturate', saturate_1.Saturate],
    ['sepia', sepia_1.Sepia],
]);
exports.filterStringToClass = filterStringToClass;
//# sourceMappingURL=filter-string-to-class.js.map