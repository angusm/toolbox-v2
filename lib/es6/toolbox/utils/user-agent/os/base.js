import { USER_AGENT_STRING } from "../string";
var OS = (function () {
    function OS() {
    }
    OS.getAsCSSModifier = function () {
        return this.name_.toLowerCase().replace(/\s/, '-');
    };
    OS.isCurrentOS = function () {
        return this.regex_.test(USER_AGENT_STRING);
    };
    return OS;
}());
export { OS };
//# sourceMappingURL=base.js.map