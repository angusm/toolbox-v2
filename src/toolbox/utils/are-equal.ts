function areEqual(...values:any[]): boolean {
    return values.slice(1).every((value) => values[0] === value);
}

export {areEqual};
