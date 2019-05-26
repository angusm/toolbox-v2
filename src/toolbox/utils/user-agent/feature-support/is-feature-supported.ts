import { Browser } from '../browser/base';
import { NumericRange } from '../../math/numeric-range';

function isFeatureSupported(
  browser: typeof Browser,
  featureSupportMap: Map<typeof Browser, NumericRange>
): boolean {
  const version = browser.getVersion();
  const range = featureSupportMap.get(browser);
  return range.contains(version);
}

export { isFeatureSupported };
