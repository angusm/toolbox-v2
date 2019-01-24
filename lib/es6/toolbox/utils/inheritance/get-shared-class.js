import { getAncestorClasses } from "./get-ancestor-classes";
import { zip } from "../array/zip";
import { areEqual } from "../are-equal";
function getSharedClass() {
    var Classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Classes[_i] = arguments[_i];
    }
    return zip.apply(void 0, Classes.map(function (CurrentClass) {
        var ancestorClasses = getAncestorClasses(CurrentClass);
        return [CurrentClass].concat(ancestorClasses).reverse();
    })).reverse()
        .find(function (ancestors) { return areEqual.apply(void 0, ancestors); })[0];
}
export { getSharedClass };
//# sourceMappingURL=get-shared-class.js.map