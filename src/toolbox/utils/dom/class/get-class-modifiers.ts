function getClassModifiers(element: Element, baseClass: string): string[] {
  return Array.from(element.classList)
    .filter((candidate) => candidate.indexOf(`${baseClass}--`) === 0)
    .map((matchingClass) => matchingClass.split('--').slice(1).join('--'));
}

export {getClassModifiers};
