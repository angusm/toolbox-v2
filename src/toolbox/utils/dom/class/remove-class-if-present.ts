import {renderLoop} from "../../render-loop";

function removeClassIfPresent(element: Element, classToRemove: string): void {
  renderLoop.mutate(() => element.classList.remove(classToRemove));
}

export {removeClassIfPresent};
