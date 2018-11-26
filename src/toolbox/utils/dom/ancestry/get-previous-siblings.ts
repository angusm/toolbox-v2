function getPreviousSiblings(el: Node): Array<Node> {
  let previousSibling: Node = <Node>(el.parentElement.firstChild);
  const result = [];
  while (previousSibling !== el) {
    result.push(previousSibling);
    previousSibling = <Node>(previousSibling.nextSibling);
  }
  return result;
}

export {getPreviousSiblings};
