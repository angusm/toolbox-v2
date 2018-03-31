const renderLoop = require('../../utils/render-loop');
const zip = require('../../utils/iterable/zip');

const Class = Object.freeze({
    CONTAINER: 'accordion',
    CONTENT: 'accordion__content',
    ITEM: 'accordion__item',
    TOGGLE: 'accordion__toggle',
});

const ClassModifier = Object.freeze({
    HIDDEN: 'hidden',
    VISIBLE: 'visible',
});

class AccordionItem {
    constructor(item, itemSelector, contentSelector, toggleSelector) {
        this.contentSelector_ = contentSelector;
        this.itemSelector_ = itemSelector;
        this.toggleSelector_ = toggleSelector;
        this.content_ = item.querySelector(`.${contentSelector}`);
        this.item_ = item;
        this.toggle_ = item.querySelector(`.${toggleSelector}`);
        this.init_();
    }

    init_() {
        this.toggle_.addEventListener('click', () => this.toggleVisibility());
    }

    static getModifiedClass_(selector, classModifier) {
        return `${selector}--${classModifier}`;
    }

    static getVisibleClass_(selector) {
        return AccordionItem.getModifiedClass_(selector, ClassModifier.VISIBLE);
    }

    static getHiddenClass_(selector) {
        return AccordionItem.getModifiedClass_(selector, ClassModifier.HIDDEN);
    }

    getElements_() {
        return [this.content_, this.item_, this.toggle_];
    }

    getSelectors_() {
        return [
            this.contentSelector_, this.itemSelector_, this.toggleSelector_];
    }

    toggleVisibility() {
        renderLoop.measure(() => {
            const visibleClass =
                AccordionItem.getVisibleClass_(this.itemSelector_);
            if (this.item_.classList.contains(visibleClass)) {
                this.hide();
            } else {
                this.show();
            }
        });
    }

    hide() {
        renderLoop.mutate(
            () => this.changeVisibility_(AccordionItem.hideElement_));
    }

    show() {
        renderLoop.mutate(
            () => this.changeVisibility_(AccordionItem.showElement_));
    }

    static hideElement_(element, selector) {
        AccordionItem.switchClasses_(
            element,
            AccordionItem.getHiddenClass_(selector),
            AccordionItem.getVisibleClass_(selector));
    }

    static showElement_(element, selector) {
        AccordionItem.switchClasses_(
            element,
            AccordionItem.getVisibleClass_(selector),
            AccordionItem.getHiddenClass_(selector));
    }

    static switchClasses_(element, classToAdd, classToRemove) {
        element.classList.add(classToAdd);
        element.classList.remove(classToRemove);
    }

    changeVisibility_(visibilityChangeFn) {
        const zippedElementsAndSelectors =
            zip(this.getElements_(), this.getSelectors_());
        zippedElementsAndSelectors.forEach(
            ([element, selector]) => visibilityChangeFn(element, selector));
    }
}

class Accordion {
    constructor (
        container,
        {
            contentSelector = Class.CONTENT,
            itemSelector = Class.ITEM,
            toggleSelector = Class.TOGGLE,
        } = {}
    ) {
        this.container_ = container;
        this.items_ =
            Accordion.getItems(
                container, itemSelector, contentSelector, toggleSelector);
    }

    static getItems(container, itemSelector, contentSelector, toggleSelector) {
        return [...container.querySelectorAll(`.${itemSelector}`)].map(
            (item) => new AccordionItem(
                item, itemSelector, contentSelector, toggleSelector));
    }
}

module.exports = Accordion;
