import { getAsList } from './get-as-list';
import { zip } from '../array/zip';
function getKeyValuePairs(value) {
    return zip(Object.keys(value), getAsList(value));
}
export { getKeyValuePairs };
//# sourceMappingURL=get-key-value-pairs.js.map