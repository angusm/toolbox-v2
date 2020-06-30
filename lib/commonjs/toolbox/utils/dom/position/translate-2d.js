"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate2d = void 0;
var matrix_service_1 = require("./matrix-service");
function translate2d(element, vector) {
    matrix_service_1.MatrixService.getSingleton().translate(element, vector);
}
exports.translate2d = translate2d;
//# sourceMappingURL=translate-2d.js.map