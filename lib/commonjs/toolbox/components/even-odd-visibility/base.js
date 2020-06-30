"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvenOddElement = void 0;
var is_displayed_1 = require("../../utils/dom/style/is-displayed");
var negate_function_1 = require("../../utils/functions/negate-function");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var remove_class_if_present_1 = require("../../utils/dom/class/remove-class-if-present");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var render_loop_1 = require("../../utils/render-loop");
var sort_by_dom_hierarchy_1 = require("../../utils/dom/position/sort-by-dom-hierarchy");
var DEFAULT_SET_ID = Symbol('EvenOddVisibilityGlobalSet');
var STYLE_OBSERVER_CONFIG = {
    attributes: true,
    attributeFilter: ["style"]
};
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
                setToProcess.getElements()
                    .filter(function (element) { return element.isExcluded(); })
                    .forEach(function (element) { return element.markNothing(); });
                var validElements = setToProcess.getElements()
                    .filter(function (element) { return !element.isExcluded(); });
                var elementsToEvenOddElement = new Map();
                var htmlElements = validElements.map(function (evenOddEl) {
                    var htmlEl = evenOddEl.getElement();
                    elementsToEvenOddElement.set(htmlEl, evenOddEl);
                    return htmlEl;
                });
                var isOdd = true;
                sort_by_dom_hierarchy_1.sortByDomHierarchy(htmlElements)
                    .map(function (htmlEl) { return elementsToEvenOddElement.get(htmlEl); })
                    .forEach(function (evenOddEl) {
                    if (isOdd) {
                        evenOddEl.markOdd();
                    }
                    else {
                        evenOddEl.markEven();
                    }
                    isOdd = !isOdd;
                });
            });
            _this.setsToProcess_.clear();
        });
    };
    SetManager.prototype.processSet = function (set) {
        this.setsToProcess_.add(set);
    };
    SetManager.prototype.removeSet = function (set) {
        this.setsToProcess_.delete(set);
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
    EvenOddSet.prototype.getElements = function () {
        return Array.from(this.elements_.values());
    };
    EvenOddSet.prototype.removeElement = function (el) {
        this.elements_.delete(el);
        if (this.elements_.size === 0) {
            SetManager.getSingleton().removeSet(this);
        }
    };
    return EvenOddSet;
}());
var EvenOddElement = (function () {
    function EvenOddElement(element, _a) {
        var _this = this;
        var _b = _a.getEvenClassFn, getEvenClassFn = _b === void 0 ? function () { return 'even'; } : _b, _c = _a.getOddClassFn, getOddClassFn = _c === void 0 ? function () { return 'odd'; } : _c, _d = _a.isExcludedFn, isExcludedFn = _d === void 0 ? negate_function_1.negateFunction(is_displayed_1.isDisplayed) : _d, _e = _a.setId, setId = _e === void 0 ? DEFAULT_SET_ID : _e;
        this.element_ = element;
        this.getEvenClassFn_ = getEvenClassFn;
        this.getOddClassFn_ = getOddClassFn;
        this.isExcludedFn_ = isExcludedFn;
        this.set_ = SetManager.getSingleton().get(setId);
        this.set_.addElement(this);
        this.observer_ =
            new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'style') {
                        SetManager.getSingleton().processSet(_this.set_);
                    }
                });
            });
        this.observer_.observe(this.element_, STYLE_OBSERVER_CONFIG);
        SetManager.getSingleton().processSet(this.set_);
    }
    EvenOddElement.prototype.isExcluded = function () {
        return this.isExcludedFn_(this.element_);
    };
    EvenOddElement.prototype.getElement = function () {
        return this.element_;
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
    EvenOddElement.prototype.destroy = function () {
        this.observer_.disconnect();
        this.set_.removeElement(this);
    };
    return EvenOddElement;
}());
exports.EvenOddElement = EvenOddElement;
//# sourceMappingURL=base.js.map