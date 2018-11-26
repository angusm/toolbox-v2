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
var Linux = (function (_super) {
    __extends(Linux, _super);
    function Linux() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Linux.name_ = 'Linux';
    Linux.regex_ = /(Linux|X11)/;
    return Linux;
}(OS));
export { Linux };
//# sourceMappingURL=linux.js.map