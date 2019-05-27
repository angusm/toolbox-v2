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
import { LazyLoaded } from './lazy-loaded';
import { loadImage } from '../../utils/loading/load-image';
import { setStyle } from '../../utils/dom/style/set-style';
var LazyLoadedBackgroundImage = (function (_super) {
    __extends(LazyLoadedBackgroundImage, _super);
    function LazyLoadedBackgroundImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyLoadedBackgroundImage.prototype.loadImage = function (url, element, callbacks) {
        loadImage(url).then(function () {
            setStyle(element, 'background-image', "url(" + url + ")");
            callbacks.forEach(function (callback) {
                callback(element, url);
            });
        });
    };
    return LazyLoadedBackgroundImage;
}(LazyLoaded));
export { LazyLoadedBackgroundImage };
//# sourceMappingURL=lazy-loaded-background-image.js.map