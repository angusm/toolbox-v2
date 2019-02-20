var AlphaByBrightness = (function () {
    function AlphaByBrightness() {
    }
    AlphaByBrightness.prototype.filter = function (imageData) {
        var colorValues = imageData.data;
        var length = colorValues.length;
        for (var i = 0; i < length; i += 4) {
            colorValues[i + 3] =
                3 * colorValues[i] + 4 * colorValues[i + 1] + colorValues[i + 2] >>> 3;
        }
        return imageData;
    };
    return AlphaByBrightness;
}());
export { AlphaByBrightness };
//# sourceMappingURL=alpha-by-brightness.js.map