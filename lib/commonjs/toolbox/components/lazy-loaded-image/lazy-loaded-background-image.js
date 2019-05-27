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
var set_style_1 = require("../../utils/dom/style/set-style");
var LazyLoadedBackgroundImage = (function (_super) {
    __extends(LazyLoadedBackgroundImage, _super);
    function LazyLoadedBackgroundImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyLoadedBackgroundImage.prototype.loadImage = function (url, element, callbacks) {
        load_image_1.loadImage(url).then(function () {
            set_style_1.setStyle(element, 'background-image', "url(" + url + ")");
            callbacks.forEach(function (callback) {
                callback(element, url);
            });
        });
    };
    return LazyLoadedBackgroundImage;
}(lazy_loaded_1.LazyLoaded));
exports.LazyLoadedBackgroundImage = LazyLoadedBackgroundImage;
//# sourceMappingURL=lazy-loaded-background-image.js.map