var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { OS } from "./base";
var WindowsVista = (function (_super) {
    __extends(WindowsVista, _super);
    function WindowsVista() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsVista.name_ = 'Windows Vista';
    WindowsVista.regex_ = /Windows NT 6.0/;
    return WindowsVista;
}(OS));
export { WindowsVista };
//# sourceMappingURL=windows-vista.js.map