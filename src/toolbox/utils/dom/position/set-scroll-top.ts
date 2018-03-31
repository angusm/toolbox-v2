import {getScrollElement} from './get-scroll-element';

function setScrollTop(
  scrollPosition: number, element: Element = null
): void {
    const scrollElement = element || getScrollElement();
    scrollElement.scrollTop = scrollPosition;
}

export {setScrollTop};
