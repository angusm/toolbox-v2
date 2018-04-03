var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { OS } from "./base";
var iOS = (function (_super) {
    __extends(iOS, _super);
    function iOS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    iOS.name_ = 'iOS';
    iOS.regex_ = /(iPhone|iPad|iPod)/;
    return iOS;
}(OS));
export { iOS };
//# sourceMappingURL=ios.js.map