import {removeClassModifiers} from "./remove-class-modifiers";
import {addClassIfMissing} from "./add-class-if-missing";

function updateClassModifiers(
  element: Element,
  baseClass: string,
  modifiersToKeep: string[],
  keepBase: boolean = true
) {
  const classesToAdd: string[] =
    modifiersToKeep.map((modifier: string) => `${baseClass}--${modifier}`);
  const classesToKeep: string[] =
    keepBase ? [baseClass, ...classesToAdd]: classesToAdd;
  removeClassModifiers(element, baseClass, {blacklist: classesToKeep});
  classesToKeep
    .forEach((classToAdd: string) => addClassIfMissing(element, classToAdd));
}

export {updateClassModifiers};
