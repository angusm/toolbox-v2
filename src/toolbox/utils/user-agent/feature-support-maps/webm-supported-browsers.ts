import { NumericRange } from '../../math/numeric-range';
import { Browser } from '../browser/base';
import { Edge } from '../browser/edge';
import { Firefox } from '../browser/firefox';
import { Chrome } from '../browser/chrome';
import { Opera } from '../browser/opera';

const webmSupportedBrowsers: Map<typeof Browser, NumericRange> = new Map([
  [<typeof Browser>Edge, new NumericRange(75, Number.POSITIVE_INFINITY)],
  [<typeof Browser>Firefox, new NumericRange(28, Number.POSITIVE_INFINITY)],
  [<typeof Browser>Chrome, new NumericRange(25, Number.POSITIVE_INFINITY)],
  [<typeof Browser>Opera, new NumericRange(16, Number.POSITIVE_INFINITY)]
]);

export { webmSupportedBrowsers };
