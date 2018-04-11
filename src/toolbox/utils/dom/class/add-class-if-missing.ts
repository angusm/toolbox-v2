import {renderLoop} from "../../render-loop";

function addClassIfMissing(element: Element, classToAdd: string): void {
  renderLoop.measure(() => {
    if (!element.classList.contains(classToAdd)) {
      renderLoop.mutate(() => element.classList.add(classToAdd));
    }
  });
}

export {addClassIfMissing};
