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
var WindowsServer2003 = (function (_super) {
    __extends(WindowsServer2003, _super);
    function WindowsServer2003() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsServer2003.name_ = 'Windows Server 2003';
    WindowsServer2003.regex_ = /Windows NT 5.2/;
    return WindowsServer2003;
}(OS));
export { WindowsServer2003 };
//# sourceMappingURL=windows-server-2003.js.map