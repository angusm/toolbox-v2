import {removeClassModifiers} from "./remove-class-modifiers";
import {addClassIfMissing} from "./add-class-if-missing";

function updateClassModifiers(
  element: Element,
  baseClass: string,
  modifiersToKeep: string[],
  keepBase: boolean = true
) {
  const classesToAdd =
    modifiersToKeep.map((modifier: string) => `${baseClass}--${modifier}`);
  const classesToKeep = keepBase ? [baseClass, ...classesToAdd]: classesToAdd;
  removeClassModifiers(element, baseClass, classesToKeep);
  classesToAdd
    .forEach((classToAdd: string) => addClassIfMissing(element, classToAdd));
}

export {updateClassModifiers};
