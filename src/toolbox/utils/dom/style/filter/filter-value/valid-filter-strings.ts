import {filterStringToClass} from "./filter-string-to-class";

const validFilterStrings =
  new Set(Array.from(filterStringToClass.keys()));

export {validFilterStrings};
