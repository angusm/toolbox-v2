import {frameMemoize} from '../../frame-memoize';

type GetOffsetAncestorsSignature =
  (element: HTMLElement, terminusAncestor?: HTMLElement) => HTMLElement[];

const getOffsetAncestors: GetOffsetAncestorsSignature =
  frameMemoize(getOffsetAncestors_);

function getOffsetAncestors_(
  element: HTMLElement, terminusAncestor: HTMLElement = null
): HTMLElement[] {
  if (!element || element === terminusAncestor) {
    return [];
  }
  return [element].concat(
    getOffsetAncestors(<HTMLElement>element.offsetParent, terminusAncestor));
}

export {getOffsetAncestors};
