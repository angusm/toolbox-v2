"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = void 0;
function loadImage(imageUrl) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.addEventListener('load', function () { return resolve(image); }, { once: true });
        image.addEventListener('error', function () { return reject(image); }, { once: true });
        image.src = imageUrl;
    });
}
exports.loadImage = loadImage;
//# sourceMappingURL=load-image.js.map