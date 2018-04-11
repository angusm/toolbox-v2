import {renderLoop} from "../../render-loop";

function removeClassIfPresent(element: Element, classToRemove: string): void {
  renderLoop.measure(() => {
    if (element.classList.contains(classToRemove)) {
      renderLoop.mutate(() => element.classList.remove(classToRemove));
    }
  });
}

export {removeClassIfPresent};
