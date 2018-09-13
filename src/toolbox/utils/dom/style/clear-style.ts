function clearStyle(element: HTMLElement, style: string): void {
  element.style.setProperty(style, '');
}

export {clearStyle};
