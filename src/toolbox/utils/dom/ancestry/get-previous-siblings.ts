function getPreviousSiblings(el: Node): Array<Node> {
  let previousSibling = el.parentElement.firstChild;
  const result = [];
  while (previousSibling !== el) {
    result.push(previousSibling);
    previousSibling = previousSibling.nextSibling;
  }
  return result;
}

export {getPreviousSiblings};
