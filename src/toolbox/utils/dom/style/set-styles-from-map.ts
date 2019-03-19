function setStylesFromMap(element: HTMLElement, styles: Map<string, string>): void {
  styles.forEach((value, style) => element.style.setProperty(style, value));
}

export {setStylesFromMap};
