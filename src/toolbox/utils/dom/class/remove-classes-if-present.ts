import {renderLoop} from "../../render-loop";

function removeClassesIfPresent(
  element: Element,
  classesToRemove: string[]
): void {
  renderLoop.mutate(() => {
    classesToRemove.forEach(
      (classToRemove) => element.classList.remove(classToRemove));
  });
}

export {removeClassesIfPresent};
