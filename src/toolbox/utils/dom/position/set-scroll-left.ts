import {SCROLL_ELEMENT} from "./scroll-element";

function setScrollLeft(
  scrollPosition: number, element: Element = null
): void {
    const scrollElement = element || SCROLL_ELEMENT;
    scrollElement.scrollLeft = scrollPosition;
}

export {setScrollLeft};
