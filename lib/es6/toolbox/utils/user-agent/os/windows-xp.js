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
import { OS } from "./base";
var WindowsXP = (function (_super) {
    __extends(WindowsXP, _super);
    function WindowsXP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsXP.name_ = 'Windows XP';
    WindowsXP.regex_ = /(Windows NT 5.1|Windows XP)/;
    return WindowsXP;
}(OS));
export { WindowsXP };
//# sourceMappingURL=windows-xp.js.map