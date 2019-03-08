import {renderLoop} from "../../render-loop";

function addClassIfMissing(element: Element, classToAdd: string): void {
  renderLoop.mutate(() => element.classList.add(classToAdd));
}

export {addClassIfMissing};
