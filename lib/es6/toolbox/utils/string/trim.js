import { lstrip } from './lstrip';
import { rstrip } from './rstrip';
function trim(value) {
    return lstrip(rstrip(value));
}
export { trim };
//# sourceMappingURL=trim.js.map