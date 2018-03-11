function areEqual(target:any, ...values:any[]) {
    return values.every((value) => target === value);
}

export {areEqual};
