"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Edge = (function (_super) {
    __extends(Edge, _super);
    function Edge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Edge.name_ = 'Edge';
    Edge.uaidsWithOffsets_ = [
        ['Microsoft Edge', [['Microsoft Edge', 5]]]
    ];
    return Edge;
}(base_1.Browser));
exports.Edge = Edge;
//# sourceMappingURL=edge.js.map