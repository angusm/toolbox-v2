import {IFilterValueStatic} from "./i-filter-value";
import {Blur} from "./blur";
import {Brightness} from "./brightness";
import {Grayscale} from "./grayscale";
import {Contrast} from "./contrast";
import {DropShadow} from "./drop-shadow";
import {Invert} from "./invert";
import {Opacity} from "./opacity";
import {Saturate} from "./saturate";
import {Sepia} from "./sepia";
import {HueRotate} from "./hue-rotate";

const filterStringToClass: Map<string, IFilterValueStatic> =
  new Map<string, IFilterValueStatic>([
    ['blur', Blur],
    ['brightness', Brightness],
    ['contrast', Contrast],
    ['drop-shadow', DropShadow],
    ['grayscale', Grayscale],
    ['hue-rotate', HueRotate],
    ['invert', Invert],
    ['opacity', Opacity],
    ['saturate', Saturate],
    ['sepia', Sepia],
  ]);

export {filterStringToClass};
