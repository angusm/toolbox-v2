import { NumericRange } from '../../math/numeric-range';
import { Edge } from '../browser/edge';
import { Firefox } from '../browser/firefox';
import { Chrome } from '../browser/chrome';
import { Opera } from '../browser/opera';
import { isFeatureSupported } from './is-feature-supported';
var webmSupportedBrowsers = new Map([
    [Edge, new NumericRange(75, Number.POSITIVE_INFINITY)],
    [Firefox, new NumericRange(28, Number.POSITIVE_INFINITY)],
    [Chrome, new NumericRange(25, Number.POSITIVE_INFINITY)],
    [Opera, new NumericRange(16, Number.POSITIVE_INFINITY)]
]);
function isWebmSupported(browser) {
    return isFeatureSupported(browser, webmSupportedBrowsers);
}
export { isWebmSupported };
//# sourceMappingURL=is-webm-supported.js.map