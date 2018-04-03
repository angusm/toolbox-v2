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
var Windows98 = (function (_super) {
    __extends(Windows98, _super);
    function Windows98() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Windows98.name_ = 'Windows 98';
    Windows98.regex_ = /(Windows 98|Win98)/;
    return Windows98;
}(OS));
export { Windows98 };
//# sourceMappingURL=windows-98.js.map