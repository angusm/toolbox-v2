function insert(values, value, index) {
    for (var i = values.length; i > index; i--) {
        values[i] = values[i - 1];
    }
    values[index] = value;
    return values;
}
export { insert };
//# sourceMappingURL=insert.js.map