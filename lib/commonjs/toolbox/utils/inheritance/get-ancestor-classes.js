"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_parent_class_1 = require("./get-parent-class");
function getAncestorClasses(CurrentClass) {
    var ParentClass = get_parent_class_1.getParentClass(CurrentClass);
    return ParentClass ? [ParentClass].concat(getAncestorClasses(ParentClass)) : [];
}
exports.getAncestorClasses = getAncestorClasses;
//# sourceMappingURL=get-ancestor-classes.js.map