function spliceFirstInstance<T>(values: T[], value: T): T[] {
    const index = values.indexOf(value);
    if (index !== -1) {
        return values.splice(index, 1);
    } else {
        return [];
    }
}

export {spliceFirstInstance};
