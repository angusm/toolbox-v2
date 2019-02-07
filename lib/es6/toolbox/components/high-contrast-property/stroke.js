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
import { HighContrastProperty } from "./base";
var HighContrastStroke = (function (_super) {
    __extends(HighContrastStroke, _super);
    function HighContrastStroke() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighContrastStroke.getProperty = function () {
        return 'stroke';
    };
    return HighContrastStroke;
}(HighContrastProperty));
export { HighContrastStroke };
//# sourceMappingURL=stroke.js.map