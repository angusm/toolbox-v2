"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../utils/dom/style/is-displayed");
var negate_function_1 = require("../../utils/functions/negate-function");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var remove_class_if_present_1 = require("../../utils/dom/class/remove-class-if-present");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var render_loop_1 = require("../../utils/render-loop");
var DEFAULT_SET_ID = Symbol('EvenOddVisibilityGlobalSet');
var SetManager = (function () {
    function SetManager() {
        this.sets_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return new EvenOddSet(); });
        this.setsToProcess_ = new Set();
        this.render_();
    }
    SetManager.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            _this.setsToProcess_.forEach(function (setToProcess) {
            });
            render_loop_1.renderLoop.mutate(function () {
            });
        });
    };
    SetManager.prototype.processSet = function (set) {
        this.setsToProcess_.add(set);
    };
    SetManager.prototype.get = function (setId) {
        return this.sets_.get(setId);
    };
    SetManager.getSingleton = function () {
        return this.singleton_ || (this.singleton_ = new this());
    };
    return SetManager;
}());
var EvenOddSet = (function () {
    function EvenOddSet() {
        this.elements_ = new Set();
    }
    EvenOddSet.prototype.addElement = function (el) {
        this.elements_.add(el);
    };
    return EvenOddSet;
}());
var EvenOddElement = (function () {
    function EvenOddElement(element, _a) {
        var _b = _a.getEvenClassFn, getEvenClassFn = _b === void 0 ? function () { return 'even'; } : _b, _c = _a.getOddClassFn, getOddClassFn = _c === void 0 ? function () { return 'odd'; } : _c, _d = _a.isExcludedFn, isExcludedFn = _d === void 0 ? negate_function_1.negateFunction(is_displayed_1.isDisplayed) : _d, _e = _a.setId, setId = _e === void 0 ? DEFAULT_SET_ID : _e;
        this.element_ = element;
        this.getEvenClassFn_ = getEvenClassFn;
        this.getOddClassFn_ = getOddClassFn;
        this.isExcludedFn_ = isExcludedFn;
        var set = SetManager.getSingleton().get(setId);
        set.addElement(this);
    }
    EvenOddElement.prototype.isExcluded = function () {
        return this.isExcludedFn_(this.element_);
    };
    EvenOddElement.prototype.markEven = function () {
        add_class_if_missing_1.addClassIfMissing(this.element_, this.getEvenClassFn_());
        remove_class_if_present_1.removeClassIfPresent(this.element_, this.getOddClassFn_());
    };
    EvenOddElement.prototype.markOdd = function () {
        remove_class_if_present_1.removeClassIfPresent(this.element_, this.getEvenClassFn_());
        add_class_if_missing_1.addClassIfMissing(this.element_, this.getOddClassFn_());
    };
    EvenOddElement.prototype.markNothing = function () {
        remove_class_if_present_1.removeClassIfPresent(this.element_, this.getEvenClassFn_());
        remove_class_if_present_1.removeClassIfPresent(this.element_, this.getOddClassFn_());
    };
    return EvenOddElement;
}());
//# sourceMappingURL=base.js.map