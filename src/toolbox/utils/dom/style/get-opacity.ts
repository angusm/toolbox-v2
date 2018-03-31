import {getStyleAsFloat} from './get-style-as-float';

function getOpacity(element: HTMLElement): number {
  return getStyleAsFloat(element, 'opacity');
}

export {getOpacity};
