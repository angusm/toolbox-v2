function getAnchorElementFromHash() {
    var hash = window.location.hash;
    return hash ? document.querySelector(hash) : null;
}
export { getAnchorElementFromHash };
//# sourceMappingURL=get-anchor-element-from-hash.js.map