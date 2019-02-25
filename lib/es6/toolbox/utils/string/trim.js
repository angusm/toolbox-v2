import { lstrip } from './lstrip';
import { rstrip } from './rstrip';
function trim(value, characters) {
    if (characters === void 0) { characters = [' ']; }
    return lstrip(rstrip(value, characters), characters);
}
export { trim };
//# sourceMappingURL=trim.js.map