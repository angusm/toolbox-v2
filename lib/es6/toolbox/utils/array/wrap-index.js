function wrapIndex(index, length) {
    if (index < 0) {
        return length + (index % length);
    }
    else {
        return index % length;
    }
}
export { wrapIndex };
//# sourceMappingURL=wrap-index.js.map