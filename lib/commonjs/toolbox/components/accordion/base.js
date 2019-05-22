"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var zip_1 = require("../../utils/array/zip");
var Class = (function () {
    function Class() {
    }
    Class.CONTAINER = 'accordion';
    Class.CONTENT = 'accordion__content';
    Class.ITEM = 'accordion__item';
    Class.TOGGLE = 'accordion__toggle';
    return Class;
}());
var ClassModifier = (function () {
    function ClassModifier() {
    }
    ClassModifier.HIDDEN = 'hidden';
    ClassModifier.VISIBLE = 'visible';
    return ClassModifier;
}());
var AccordionItem = (function () {
    function AccordionItem(item, itemSelector, contentSelector, toggleSelector) {
        this.contentSelector_ = contentSelector;
        this.itemSelector_ = itemSelector;
        this.toggleSelector_ = toggleSelector;
        this.content_ = item.querySelector("." + contentSelector);
        this.item_ = item;
        this.toggle_ = item.querySelector("." + toggleSelector);
        this.init_();
    }
    AccordionItem.prototype.init_ = function () {
        var _this = this;
        this.toggle_.addEventListener('click', function () { return _this.toggleVisibility(); });
    };
    AccordionItem.getModifiedClass_ = function (selector, classModifier) {
        return selector + "--" + classModifier;
    };
    AccordionItem.getVisibleClass_ = function (selector) {
        return AccordionItem.getModifiedClass_(selector, ClassModifier.VISIBLE);
    };
    AccordionItem.getHiddenClass_ = function (selector) {
        return AccordionItem.getModifiedClass_(selector, ClassModifier.HIDDEN);
    };
    AccordionItem.prototype.getElements_ = function () {
        return [this.content_, this.item_, this.toggle_];
    };
    AccordionItem.prototype.getSelectors_ = function () {
        return [this.contentSelector_, this.itemSelector_, this.toggleSelector_];
    };
    AccordionItem.prototype.toggleVisibility = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var visibleClass = AccordionItem.getVisibleClass_(_this.itemSelector_);
            if (_this.item_.classList.contains(visibleClass)) {
                _this.hide();
            }
            else {
                _this.show();
            }
        });
    };
    AccordionItem.prototype.hide = function () {
        var _this = this;
        render_loop_1.renderLoop.mutate(function () { return _this.changeVisibility_(AccordionItem.hideElement_); });
    };
    AccordionItem.prototype.show = function () {
        var _this = this;
        render_loop_1.renderLoop.mutate(function () { return _this.changeVisibility_(AccordionItem.showElement_); });
    };
    AccordionItem.hideElement_ = function (element, selector) {
        AccordionItem.switchClasses_(element, AccordionItem.getHiddenClass_(selector), AccordionItem.getVisibleClass_(selector));
    };
    AccordionItem.showElement_ = function (element, selector) {
        AccordionItem.switchClasses_(element, AccordionItem.getVisibleClass_(selector), AccordionItem.getHiddenClass_(selector));
    };
    AccordionItem.switchClasses_ = function (element, classToAdd, classToRemove) {
        element.classList.add(classToAdd);
        element.classList.remove(classToRemove);
    };
    AccordionItem.prototype.changeVisibility_ = function (visibilityChangeFn) {
        var zippedElementsAndSelectors = zip_1.zip(this.getElements_(), this.getSelectors_());
        zippedElementsAndSelectors.forEach(function (_a) {
            var element = _a[0], selector = _a[1];
            return visibilityChangeFn(element, selector);
        });
    };
    return AccordionItem;
}());
var Accordion = (function () {
    function Accordion(container, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.contentSelector, contentSelector = _c === void 0 ? Class.CONTENT : _c, _d = _b.itemSelector, itemSelector = _d === void 0 ? Class.ITEM : _d, _e = _b.toggleSelector, toggleSelector = _e === void 0 ? Class.TOGGLE : _e;
        this.container_ = container;
        this.items_ =
            Accordion.getItems(container, itemSelector, contentSelector, toggleSelector);
    }
    Accordion.getItems = function (container, itemSelector, contentSelector, toggleSelector) {
        return Array.from(container.querySelectorAll("." + itemSelector))
            .map(function (item) {
            return new AccordionItem(item, itemSelector, contentSelector, toggleSelector);
        });
    };
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=base.js.map