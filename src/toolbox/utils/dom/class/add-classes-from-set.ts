import {renderLoop} from "../../render-loop";

function addClassesFromSet(element: Element, cssClasses: Set<string>): void {
  renderLoop.mutate(() => element.classList.add(...Array.from(cssClasses)));
}

export {addClassesFromSet};
