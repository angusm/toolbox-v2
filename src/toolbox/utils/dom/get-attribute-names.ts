function getAttributeNames(element: Element): string[] {
  return Array.from(element.attributes).map((attribute) => attribute.name);
}

export {getAttributeNames};
