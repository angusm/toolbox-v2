import {renderLoop} from '../../utils/render-loop';
import {zip} from '../../utils/array/zip';

class Class {
  public static CONTAINER: string = 'accordion';
  public static CONTENT: string = 'accordion__content';
  public static ITEM: string = 'accordion__item';
  public static TOGGLE: string = 'accordion__toggle';
}

class ClassModifier {
  public static HIDDEN: string = 'hidden';
  public static VISIBLE: string = 'visible';
}

class AccordionItem {
  private readonly contentSelector_: string;
  private readonly itemSelector_: string;
  private readonly toggleSelector_: string;
  private readonly content_: Element;
  private readonly item_: Element;
  private readonly toggle_: Element;

  constructor(
    item: Element,
    itemSelector: string,
    contentSelector: string,
    toggleSelector: string
  ) {
    this.contentSelector_ = contentSelector;
    this.itemSelector_ = itemSelector;
    this.toggleSelector_ = toggleSelector;
    this.content_ = item.querySelector(`.${contentSelector}`);
    this.item_ = item;
    this.toggle_ = item.querySelector(`.${toggleSelector}`);
    this.init_();
  }

  private init_(): void {
    this.toggle_.addEventListener('click', () => this.toggleVisibility());
  }

  private static getModifiedClass_(
    selector: string, classModifier: string
  ): string {
    return `${selector}--${classModifier}`;
  }

  private static getVisibleClass_(selector: string): string {
    return AccordionItem.getModifiedClass_(selector, ClassModifier.VISIBLE);
  }

  private static getHiddenClass_(selector: string): string {
    return AccordionItem.getModifiedClass_(selector, ClassModifier.HIDDEN);
  }

  private getElements_(): Element[] {
    return [this.content_, this.item_, this.toggle_];
  }

  private getSelectors_(): string[] {
    return [this.contentSelector_, this.itemSelector_, this.toggleSelector_];
  }

  public toggleVisibility(): void {
    renderLoop.measure(() => {
      const visibleClass = AccordionItem.getVisibleClass_(this.itemSelector_);
      if (this.item_.classList.contains(visibleClass)) {
        this.hide();
      } else {
        this.show();
      }
    });
  }

  public hide(): void {
    renderLoop.mutate(() => this.changeVisibility_(AccordionItem.hideElement_));
  }

  public show(): void {
    renderLoop.mutate(() => this.changeVisibility_(AccordionItem.showElement_));
  }

  private static hideElement_(element: Element, selector: string): void {
    AccordionItem.switchClasses_(
      element,
      AccordionItem.getHiddenClass_(selector),
      AccordionItem.getVisibleClass_(selector));
  }

  private static showElement_(element: Element, selector: string): void {
    AccordionItem.switchClasses_(
      element,
      AccordionItem.getVisibleClass_(selector),
      AccordionItem.getHiddenClass_(selector));
  }

  private static switchClasses_(
    element: Element, classToAdd: string, classToRemove: string
  ): void {
    element.classList.add(classToAdd);
    element.classList.remove(classToRemove);
  }

  private changeVisibility_(
    visibilityChangeFn: (element: Element, selector: string) => void
  ): void {
    const zippedElementsAndSelectors: [Element, string][] =
      <[Element, string][]>zip<Element|string>(
        this.getElements_(), this.getSelectors_());
    zippedElementsAndSelectors.forEach(
      ([element, selector]) => visibilityChangeFn(element, selector));
  }
}

class Accordion {
  private container_: Element;
  private items_: AccordionItem[];

  constructor(container: Element,
    {
      contentSelector = Class.CONTENT,
      itemSelector = Class.ITEM,
      toggleSelector = Class.TOGGLE,
    }: {
      contentSelector?: string,
      itemSelector?: string,
      toggleSelector?: string,
    } = {}
  ) {
    this.container_ = container;
    this.items_ =
      Accordion.getItems(
        container, itemSelector, contentSelector, toggleSelector);
  }

  public static getItems(
    container: Element,
    itemSelector: string,
    contentSelector: string,
    toggleSelector: string
  ): AccordionItem[] {
    return Array.from(container.querySelectorAll(`.${itemSelector}`))
      .map(
        (item) => {
          return new AccordionItem(
            item, itemSelector, contentSelector, toggleSelector);
        });
  }
}

export {Accordion};
