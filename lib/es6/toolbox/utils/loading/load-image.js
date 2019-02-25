function loadImage(imageUrl) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.addEventListener('load', function () { return resolve(image); }, { once: true });
        image.addEventListener('error', function () { return reject(image); }, { once: true });
        image.src = imageUrl;
    });
}
export { loadImage };
//# sourceMappingURL=load-image.js.map