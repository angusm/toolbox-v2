import { NumericRange } from '../../math/numeric-range';
import { Edge } from '../browser/edge';
import { Firefox } from '../browser/firefox';
import { Chrome } from '../browser/chrome';
import { Opera } from '../browser/opera';
var webmSupportedBrowsers = new Map([
    [Edge, new NumericRange(75, Number.POSITIVE_INFINITY)],
    [Firefox, new NumericRange(28, Number.POSITIVE_INFINITY)],
    [Chrome, new NumericRange(25, Number.POSITIVE_INFINITY)],
    [Opera, new NumericRange(16, Number.POSITIVE_INFINITY)]
]);
export { webmSupportedBrowsers };
//# sourceMappingURL=webm-supported-browsers.js.map