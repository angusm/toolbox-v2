import { Matrix } from "./matrix";
import { Matrix3d } from "./matrix3d";
import { Translate } from "./translate";
import { TranslateX } from "./translate-x";
import { TranslateY } from "./translate-y";
import { TranslateZ } from "./translate-z";
import { Translate3d } from "./translate-3d";
import { Scale } from "./scale";
import { ScaleX } from "./scale-x";
import { ScaleY } from "./scale-y";
import { ScaleZ } from "./scale-z";
import { Scale3d } from "./scale-3d";
import { Rotate } from "./rotate";
import { RotateX } from "./rotate-x";
import { RotateY } from "./rotate-y";
import { RotateZ } from "./rotate-z";
import { Rotate3d } from "./rotate-3d";
import { Skew } from "./skew";
import { SkewX } from "./skew-x";
import { SkewY } from "./skew-y";
var transformStringToClass = new Map([
    ['matrix', Matrix],
    ['matrix3d', Matrix3d],
    ['translate', Translate],
    ['translateX', TranslateX],
    ['translateY', TranslateY],
    ['translateZ', TranslateZ],
    ['translate3d', Translate3d],
    ['scale', Scale],
    ['scaleX', ScaleX],
    ['scaleY', ScaleY],
    ['scaleZ', ScaleZ],
    ['scale3d', Scale3d],
    ['rotate', Rotate],
    ['rotateX', RotateX],
    ['rotateY', RotateY],
    ['rotateZ', RotateZ],
    ['rotate3d', Rotate3d],
    ['skew', Skew],
    ['skewX', SkewX],
    ['skewY', SkewY],
]);
export { transformStringToClass };
//# sourceMappingURL=transform-string-to-class.js.map