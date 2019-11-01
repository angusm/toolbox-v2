function spliceFirstInstance(values, value) {
    var index = values.indexOf(value);
    if (index !== -1) {
        return values.splice(index, 1);
    }
    else {
        return [];
    }
}
export { spliceFirstInstance };
//# sourceMappingURL=splice-first-instance.js.map