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
import { Browser } from "./base";
var Firefox = (function (_super) {
    __extends(Firefox, _super);
    function Firefox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Firefox.name_ = 'Firefox';
    Firefox.uaidsWithOffsets_ = [
        ['Firefox', [['Firefox', 8]]]
    ];
    return Firefox;
}(Browser));
export { Firefox };
//# sourceMappingURL=firefox.js.map