const IMPORTANT = '!important';
const IMPORTANT_LENGTH = 10;

function setStyle(
  element: ElementCSSInlineStyle,
  style: string,
  rawValue: string
): void {
  const isImportant = rawValue.slice(-IMPORTANT_LENGTH) === IMPORTANT;
  const important = isImportant ? 'important' : '';
  const value = isImportant ? rawValue.slice(0, -IMPORTANT_LENGTH) : rawValue;
  element.style.setProperty(style, value, important);
}

export { setStyle };
