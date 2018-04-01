function removeFirstInstance(values, value) {
    return values.slice(0, values.indexOf(value)).concat(values.slice(values.indexOf(value) + 1));
}
export { removeFirstInstance };
//# sourceMappingURL=remove-first-instance.js.map