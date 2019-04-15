import { MatrixService } from "./matrix-service";
function translate2d(element, vector) {
    MatrixService.getSingleton().translate(element, vector);
}
export { translate2d };
//# sourceMappingURL=translate-2d.js.map