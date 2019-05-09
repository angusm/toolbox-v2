function toggleClass(element: Element, cssClass: string, toggle: boolean) {
  if (toggle) {
    element.classList.add(cssClass);
  } else {
    element.classList.remove(cssClass);
  }
}

export {toggleClass};
