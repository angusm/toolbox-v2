import { isDisplayed } from "../../utils/dom/style/is-displayed";
import { negateFunction } from "../../utils/functions/negate-function";
import { DynamicDefaultMap } from "../../utils/map/dynamic-default";
import { removeClassIfPresent } from "../../utils/dom/class/remove-class-if-present";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { renderLoop } from "../../utils/render-loop";
import { sortByDomHierarchy } from "../../utils/dom/position/sort-by-dom-hierarchy";
var DEFAULT_SET_ID = Symbol('EvenOddVisibilityGlobalSet');
var SetManager = (function () {
    function SetManager() {
        this.sets_ = DynamicDefaultMap.usingFunction(function () { return new EvenOddSet(); });
        this.setsToProcess_ = new Set();
        this.render_();
    }
    SetManager.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
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
                sortByDomHierarchy(htmlElements)
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
    EvenOddSet.prototype.getElements = function () {
        return Array.from(this.elements_.values());
    };
    return EvenOddSet;
}());
var EvenOddElement = (function () {
    function EvenOddElement(element, _a) {
        var _b = _a.getEvenClassFn, getEvenClassFn = _b === void 0 ? function () { return 'even'; } : _b, _c = _a.getOddClassFn, getOddClassFn = _c === void 0 ? function () { return 'odd'; } : _c, _d = _a.isExcludedFn, isExcludedFn = _d === void 0 ? negateFunction(isDisplayed) : _d, _e = _a.setId, setId = _e === void 0 ? DEFAULT_SET_ID : _e;
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
    EvenOddElement.prototype.getElement = function () {
        return this.element_;
    };
    EvenOddElement.prototype.markEven = function () {
        addClassIfMissing(this.element_, this.getEvenClassFn_());
        removeClassIfPresent(this.element_, this.getOddClassFn_());
    };
    EvenOddElement.prototype.markOdd = function () {
        removeClassIfPresent(this.element_, this.getEvenClassFn_());
        addClassIfMissing(this.element_, this.getOddClassFn_());
    };
    EvenOddElement.prototype.markNothing = function () {
        removeClassIfPresent(this.element_, this.getEvenClassFn_());
        removeClassIfPresent(this.element_, this.getOddClassFn_());
    };
    return EvenOddElement;
}());
//# sourceMappingURL=base.js.map