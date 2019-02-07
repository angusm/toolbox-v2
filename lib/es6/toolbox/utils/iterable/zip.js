import { zip as iteratorZip } from '../iterator/zip';
function zip() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var listsAsIterators = lists.map(function (list) { return list[Symbol.iterator](); });
    return iteratorZip.apply(void 0, listsAsIterators);
}
export { zip };
//# sourceMappingURL=zip.js.map