import {getStyle} from "../style/get-style";

function isFixed(element: HTMLElement) {
  return getStyle(element, 'position') === 'fixed'
}

export {isFixed};
