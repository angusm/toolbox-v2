"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDomContentLoaded = void 0;
function isDomContentLoaded() {
    return document.readyState === 'complete' ||
        document.readyState === 'interactive';
}
exports.isDomContentLoaded = isDomContentLoaded;
//# sourceMappingURL=is-dom-content-loaded.js.map