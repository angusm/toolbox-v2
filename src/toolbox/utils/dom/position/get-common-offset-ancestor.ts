import {getOffsetAncestors} from './get-offset-ancestors';
import {getLastMatchingIndex} from '../../array/get-last-matching-index';

function getCommonOffsetAncestor(...elements: HTMLElement[]): HTMLElement {
  const reversedAncestorLists: HTMLElement[][] =
    elements.map((element) => getOffsetAncestors(element)).reverse();
  const ancestorIndex: number = getLastMatchingIndex(...reversedAncestorLists);
  return reversedAncestorLists[0][ancestorIndex];
}

export {getCommonOffsetAncestor};
