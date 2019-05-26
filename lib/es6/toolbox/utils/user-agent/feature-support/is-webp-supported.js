import { NumericRange } from '../../math/numeric-range';
import { Edge } from '../browser/edge';
import { Firefox } from '../browser/firefox';
import { Chrome } from '../browser/chrome';
import { Opera } from '../browser/opera';
import { isFeatureSupported } from './is-feature-supported';
var webpSupportedBrowsers = new Map([
    [Edge, new NumericRange(18, Number.POSITIVE_INFINITY)],
    [Firefox, new NumericRange(65, Number.POSITIVE_INFINITY)],
    [Chrome, new NumericRange(32, Number.POSITIVE_INFINITY)],
    [Opera, new NumericRange(19, Number.POSITIVE_INFINITY)]
]);
function isWebpSupported(browser) {
    return isFeatureSupported(browser, webpSupportedBrowsers);
}
export { isWebpSupported };
//# sourceMappingURL=is-webp-supported.js.map