
function removeClassModifiers(
  element: Element, baseClass: string, blacklist: string[] = []
): void {
  Array.from(element.classList)
    .filter(
      (className) => {
        return className.indexOf(baseClass) === 0 &&
            blacklist.indexOf(className) !== -1;
      })
    .forEach((className) => element.classList.remove(className));
}

export {removeClassModifiers};
