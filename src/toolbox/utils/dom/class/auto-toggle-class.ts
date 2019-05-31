import {renderLoop} from "../../render-loop";

function autoToggleClass(
  element: Element, cssClass: string, rawToggle: boolean = null
) {
  const toggle =
    rawToggle === null ? !element.classList.contains(cssClass) : rawToggle;

  if (toggle) {
    renderLoop.anyMutate(() => element.classList.add(cssClass));
  } else {
    renderLoop.anyMutate(() => element.classList.remove(cssClass));
  }
}

export {autoToggleClass};
