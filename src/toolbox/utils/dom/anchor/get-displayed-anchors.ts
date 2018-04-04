import {getStyle} from "../style/get-style";

function getDisplayedAnchors(querySelector: string): HTMLElement[] {
  return <HTMLElement[]>Array.from(document.querySelectorAll(querySelector))
    .filter((element: HTMLElement) => getStyle(element, 'display') !== 'none');
}

export {getDisplayedAnchors};
