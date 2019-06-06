import {UserAgent} from "../../user-agent/user-agent";

const IMPORTANT = '!important';
const IMPORTANT_LENGTH = 10;

const browser = UserAgent.getBrowser();

function setStyle(
  element: ElementCSSInlineStyle,
  rawStyle: string,
  rawValue: string
): void {
  const isImportant = rawValue.slice(-IMPORTANT_LENGTH) === IMPORTANT;
  const important = isImportant ? 'important' : '';
  const parsedValue =
    isImportant ? rawValue.slice(0, -IMPORTANT_LENGTH) : rawValue;
  const supportedProperty = browser.getSupportedStyleProperty(rawStyle);
  const supportedValue = browser.getSupportedStyleValue(rawStyle, parsedValue);

  element.style.setProperty(supportedProperty, supportedValue, important);
}

export { setStyle };
