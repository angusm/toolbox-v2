import {renderLoop} from "../../render-loop";

function addClassesIfMissing(element: Element, classesToAdd: string[]): void {
  renderLoop.mutate(() => {
    classesToAdd.forEach(
      (classToAdd) => element.classList.add(classToAdd));
  });
}

export {addClassesIfMissing};
