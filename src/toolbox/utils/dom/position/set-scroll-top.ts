import {SCROLL_ELEMENT} from "./scroll-element";

function setScrollTop(
  scrollPosition: number, element: Element = null
): void {
    const scrollElement = element || SCROLL_ELEMENT;
    scrollElement.scrollTop = scrollPosition;
}

export {setScrollTop};
