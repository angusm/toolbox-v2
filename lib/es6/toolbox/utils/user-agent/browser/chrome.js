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
import { Browser } from "./base";
var Chrome = (function (_super) {
    __extends(Chrome, _super);
    function Chrome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chrome.name_ = 'Chrome';
    Chrome.uaidsWithOffsets_ = [
        ['Chrome', [['Chrome', 7]]]
    ];
    return Chrome;
}(Browser));
export { Chrome };
//# sourceMappingURL=chrome.js.map