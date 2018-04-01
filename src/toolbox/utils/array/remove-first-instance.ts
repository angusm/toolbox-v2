function removeFirstInstance<T>(values: T[], value: T): T[] {
    return [
        ...values.slice(0, values.indexOf(value)),
        ...values.slice(values.indexOf(value) + 1)];
}

export {removeFirstInstance};
