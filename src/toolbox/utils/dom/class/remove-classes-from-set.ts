import {renderLoop} from "../../render-loop";

function removeClassesFromSet(element: Element, cssClasses: Set<string>): void {
  renderLoop.mutate(() => element.classList.remove(...Array.from(cssClasses)));
}

export {removeClassesFromSet};
