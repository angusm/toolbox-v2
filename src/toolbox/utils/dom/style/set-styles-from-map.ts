function setStylesFromMap(element: HTMLElement, styles: Map<string, string>): void {
  Array.from(styles.entries())
    .forEach(([style, value]) => element.style.setProperty(style, value));
}

export {setStylesFromMap};
