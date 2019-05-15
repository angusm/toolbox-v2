import {isDomContentLoaded} from "./is-dom-content-loaded";

function onDomContentLoad(callback: () => void): Promise<void> {
  return new Promise((resolve, reject) => {
      function resolveAndCallback() {
        callback();
        resolve();
      }

      if (isDomContentLoaded()) {
        resolveAndCallback();
      } else {
        document.addEventListener('DOMContentLoaded', resolveAndCallback);
      }
    });
}

export {onDomContentLoad};
