function zip() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var result = [];
    var i = 0;
    var remainingLists = lists.filter(function (list) { return list.length > i; });
    while (remainingLists.length) {
        result[i] = remainingLists.map(function (list) { return list[i]; });
        i++;
        remainingLists = remainingLists.filter(function (list) { return list.length > i; });
    }
    return result;
}
export { zip };
//# sourceMappingURL=zip.js.map