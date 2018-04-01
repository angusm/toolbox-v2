function getClassModifiers(element: Element, baseClass: string): string[] {
  const base: string = `${baseClass}--`;
  return Array.from(element.classList)
    .filter((candidate) => candidate.indexOf(base) === 0)
    .map((matchingClass) => matchingClass.split(base).slice(1).join(base));
}

export {getClassModifiers};
