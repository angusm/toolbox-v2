"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDomContentLoad = void 0;
var is_dom_content_loaded_1 = require("./is-dom-content-loaded");
function onDomContentLoad(callback) {
    return new Promise(function (resolve, reject) {
        function resolveAndCallback() {
            callback();
            resolve();
        }
        if (is_dom_content_loaded_1.isDomContentLoaded()) {
            resolveAndCallback();
        }
        else {
            document.addEventListener('DOMContentLoaded', resolveAndCallback);
        }
    });
}
exports.onDomContentLoad = onDomContentLoad;
//# sourceMappingURL=on-dom-content-load.js.map