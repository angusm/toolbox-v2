import {transformStringToClass} from "./transform-string-to-class";

const validTransformStrings =
  new Set(Array.from(transformStringToClass.keys()));

export {validTransformStrings};
