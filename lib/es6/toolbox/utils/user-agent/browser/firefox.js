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
import { Browser } from "./base";
import { USER_AGENT_STRING } from "../string";
var Firefox = (function (_super) {
    __extends(Firefox, _super);
    function Firefox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Firefox.getVersion = function () {
        return parseFloat(USER_AGENT_STRING.split('Firefox/')[1].split(' ')[0]);
    };
    Firefox.name_ = 'Firefox';
    Firefox.uaidsWithOffsets_ = [
        ['Firefox', [['Firefox', 8]]]
    ];
    return Firefox;
}(Browser));
export { Firefox };
//# sourceMappingURL=firefox.js.map