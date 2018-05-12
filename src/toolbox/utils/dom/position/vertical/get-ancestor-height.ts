function getAncestorHeight(ancestor: HTMLElement = null): number {
  return ancestor ? ancestor.offsetHeight : window.innerHeight;
}

export {getAncestorHeight};
