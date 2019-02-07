import { isDefined } from './is-defined';
function isDef(value) {
    console.warn("Toolbox's isDef is deprecated, please use the better named " +
        "isDefined instead");
    return isDefined(value);
}
export { isDef };
//# sourceMappingURL=is-def.js.map