function insert<T>(values: T[], value: T, index: number): T[] {
    for (let i = values.length; i > index; i--) {
      values[i] = values[i - 1];
    }
    values[index] = value;
    return values;
}

export {insert};
