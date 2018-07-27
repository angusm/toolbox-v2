"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var RunOnScroll = (function (_super) {
    __extends(RunOnScroll, _super);
    function RunOnScroll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RunOnScroll.prototype.shouldRun_ = function (newValue) {
        return scroll_1.Scroll.getSingleton().hasChanged();
    };
    return RunOnScroll;
}(base_1.RunOnCondition));
exports.RunOnScroll = RunOnScroll;
//# sourceMappingURL=scroll.js.map