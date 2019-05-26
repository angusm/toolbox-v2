import { NumericRange } from '../../math/numeric-range';
import { Browser } from '../browser/base';
import { Edge } from '../browser/edge';
import { Firefox } from '../browser/firefox';
import { Chrome } from '../browser/chrome';
import { Opera } from '../browser/opera';

const webpSupportedBrowsers: Map<typeof Browser, NumericRange> = new Map<
  typeof Browser,
  NumericRange
>([
  [Edge, new NumericRange(18, Number.POSITIVE_INFINITY)],
  [Firefox, new NumericRange(65, Number.POSITIVE_INFINITY)],
  [Chrome, new NumericRange(32, Number.POSITIVE_INFINITY)],
  [Opera, new NumericRange(19, Number.POSITIVE_INFINITY)]
]);

export { webpSupportedBrowsers };
