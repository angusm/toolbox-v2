import {renderLoop} from "../../render-loop";

function removeClassesIfPresent(
  element: Element,
  classesToRemove: string[]
): void {
  renderLoop.mutate(() => element.classList.remove(...classesToRemove));
}

export {removeClassesIfPresent};
