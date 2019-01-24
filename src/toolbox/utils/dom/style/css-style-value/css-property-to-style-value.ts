import {
  ICssStyleValueInstance,
  ICssStyleValueStatic
} from '../interfaces/css-style-value';
import {Color} from "../../../color/color";

const cssPropertyToStyleValue =
  new Map<string, ICssStyleValueStatic<ICssStyleValueInstance>>([
    ['background-color', Color],
  ]);

export {cssPropertyToStyleValue}
