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
var Opera = (function (_super) {
    __extends(Opera, _super);
    function Opera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Opera.name_ = 'Opera';
    Opera.uaidsWithOffsets_ = [
        ['Opera', [['Version', 8], ['Opera', 6]]],
        ['OPR', [['OPR', 4]]],
    ];
    return Opera;
}(Browser));
export { Opera };
//# sourceMappingURL=opera.js.map