function addClassIfMissing(element: Element, classToAdd: string): void {
  if (!element.classList.contains(classToAdd)) {
    element.classList.add(classToAdd);
  }
}

export {addClassIfMissing};
