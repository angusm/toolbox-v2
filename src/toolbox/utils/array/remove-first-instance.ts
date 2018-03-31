function removeFirstInstance(iterable, value) {
    const values = [...iterable];
    return [
        ...values.slice(0, values.indexOf(value)),
        ...values.slice(values.indexOf(value) + 1)];
}

module.exports = removeFirstInstance;
