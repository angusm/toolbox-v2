import {renderLoop} from "../../render-loop";

function removeClassIfPresent(
  element: Element,
  ...classesToRemove: string[]
): void {
  renderLoop.anyMutate(() => element.classList.remove(...classesToRemove));
}

export {removeClassIfPresent};
