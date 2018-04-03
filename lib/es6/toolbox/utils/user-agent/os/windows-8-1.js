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
var Windows8_1 = (function (_super) {
    __extends(Windows8_1, _super);
    function Windows8_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows8_1.name_ = 'Windows 8.1';
    Windows8_1.regex_ = /(Windows 8.1|Windows NT 6.3)/;
    return Windows8_1;
}(OS));
export { Windows8_1 };
//# sourceMappingURL=windows-8-1.js.map