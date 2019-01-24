import {getAncestorClasses} from "./get-ancestor-classes";
import {zip} from "../array/zip";
import {areEqual} from "../are-equal";

function getSharedClass(...Classes: Function[]): Function {
  return zip(
    ...Classes.map(
      (CurrentClass) => {
        const ancestorClasses = getAncestorClasses(CurrentClass);
        return [CurrentClass, ...ancestorClasses].reverse();
      }))
    .reverse()
    .find((ancestors) => areEqual(...ancestors))[0];
}

export {getSharedClass};
