function areEqual(target:any, ...values:any[]): boolean {
    return values.every((value) => target === value);
}

export {areEqual};
