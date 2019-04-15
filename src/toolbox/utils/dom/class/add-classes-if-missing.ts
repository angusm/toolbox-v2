import {renderLoop} from "../../render-loop";

function addClassesIfMissing(element: Element, classesToAdd: string[]): void {
  renderLoop.mutate(() => element.classList.add(...classesToAdd));
}

export {addClassesIfMissing};
