"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorService = (function () {
    function ErrorService() {
        this.throwHandler_ = ErrorService.defaultThrowHandler_;
    }
    ErrorService.getSingleton = function () {
        return this.singleton_ || (this.singleton_ = new this());
    };
    ErrorService.throw = function (message) {
        this.getSingleton().throw(message);
    };
    ErrorService.prototype.throw = function (message) {
        this.throwHandler_(message);
    };
    ErrorService.prototype.overrideThrow = function (throwHandler) {
        this.throwHandler_ = throwHandler;
    };
    ErrorService.prototype.getThrowHandler = function () {
        return this.throwHandler_;
    };
    ErrorService.defaultThrowHandler_ = function (message) {
        throw new Error(message);
    };
    ErrorService.singleton_ = null;
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=service.js.map