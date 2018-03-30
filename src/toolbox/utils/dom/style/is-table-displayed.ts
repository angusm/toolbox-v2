import {toBool} from '../../to-bool';

const TABLE_DISPLAY_STYLES: string[] = [
  'table',
  'table-cell',
  'table-row',
];

function isTableDisplayed(element: HTMLElement): boolean {
  return toBool(
    TABLE_DISPLAY_STYLES.find((style) => element.style.display === style));
}

export {isTableDisplayed};