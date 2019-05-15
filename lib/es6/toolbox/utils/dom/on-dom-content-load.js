import { isDomContentLoaded } from "./is-dom-content-loaded";
function onDomContentLoad(callback) {
    return new Promise(function (resolve, reject) {
        function resolveAndCallback() {
            callback();
            resolve();
        }
        if (isDomContentLoaded()) {
            resolveAndCallback();
        }
        else {
            document.addEventListener('DOMContentLoaded', resolveAndCallback);
        }
    });
}
export { onDomContentLoad };
//# sourceMappingURL=on-dom-content-load.js.map