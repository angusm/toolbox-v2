"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lazy_loaded_1 = require("./lazy-loaded");
var load_image_1 = require("../../utils/loading/load-image");
var LazyLoadedImage = (function (_super) {
    __extends(LazyLoadedImage, _super);
    function LazyLoadedImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyLoadedImage.prototype.loadImage = function (url, element, callbacks) {
        load_image_1.loadImage(url).then(function () {
            element.src = url;
            callbacks.forEach(function (callback) {
                callback(element, url);
            });
        });
    };
    return LazyLoadedImage;
}(lazy_loaded_1.LazyLoaded));
exports.LazyLoadedImage = LazyLoadedImage;
//# sourceMappingURL=lazy-loaded-image.js.map