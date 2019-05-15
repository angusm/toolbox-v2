import {setScrollLeft} from './set-scroll-left';
import {setScrollTop} from './set-scroll-top';
import {Vector2d} from "../../math/geometry/vector-2d";
import {SCROLL_ELEMENT} from "./scroll-element";

function setScroll(
  scrollPosition: Vector2d, element: Element = null
): void {
  const scrollElement = element !== null ? element : SCROLL_ELEMENT;
  setScrollLeft(scrollPosition.x, scrollElement);
  setScrollTop(scrollPosition.y, scrollElement);
}

export {setScroll};
