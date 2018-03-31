import {getScrollElement} from './get-scroll-element';

function setScrollLeft(
  scrollPosition: number, element: Element = null
): void {
    const scrollElement = element || getScrollElement();
    scrollElement.scrollLeft = scrollPosition;
}

export {setScrollLeft};
