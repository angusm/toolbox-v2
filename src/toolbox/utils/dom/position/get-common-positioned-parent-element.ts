import {getLastMatchingIndex} from '../../array/get-last-matching-index';
import {getParentElements} from "./get-parent-elements";
import {isPositioned} from "./is-positioned";

function getCommonPositionedParentElement(
  ...elements: HTMLElement[]
): HTMLElement {
  const reversedAncestorLists: HTMLElement[][] =
    elements
      .map(
        (element) => {
          return getParentElements(element).filter(isPositioned).reverse();
        });
  const ancestorIndex: number = getLastMatchingIndex(...reversedAncestorLists);
  return reversedAncestorLists[0][ancestorIndex];
}

export {getCommonPositionedParentElement};
