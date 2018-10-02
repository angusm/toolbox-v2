function getNextSiblings(el: Node): Array<Node> {
  let nextSibling = el.nextSibling;
  const result = [];
  while (nextSibling) {
    result.push(nextSibling);
    nextSibling = nextSibling.nextSibling;
  }
  return result;
}

export {getNextSiblings};
