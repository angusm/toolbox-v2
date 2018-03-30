function getAttributeValue(
  element: HTMLElement, attributeName: string
): string {
  const attribute: Attr = element.attributes.getNamedItem(attributeName);
  return attribute ? attribute.value : undefined;
}

export {getAttributeValue};
