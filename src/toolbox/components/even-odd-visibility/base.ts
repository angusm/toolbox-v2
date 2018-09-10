// Adds even and odd classes to elements while ignoring "display: none;" elements
import {isDisplayed} from "../../utils/dom/style/is-displayed";
import {negateFunction} from "../../utils/functions/negate-function";
import {DynamicDefaultMap} from "../../utils/map/dynamic-default";
import HTML = Mocha.reporters.HTML;
import {removeClassIfPresent} from "../../utils/dom/class/remove-class-if-present";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {renderLoop} from "../../utils/render-loop";

const DEFAULT_SET_ID = Symbol('EvenOddVisibilityGlobalSet');

class SetManager {
  private static singleton_: SetManager;
  private sets_: DynamicDefaultMap<Symbol, EvenOddSet>;
  private setsToProcess_: Set<EvenOddSet>;

  constructor() {
    this.sets_ = DynamicDefaultMap.usingFunction(() => new EvenOddSet());
    this.setsToProcess_ = new Set();
    this.render_();
  }

  render_() {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      this.setsToProcess_.forEach(
        (setToProcess) => {

        });

      renderLoop.mutate(() => {

      });
    });
  }

  processSet(set: EvenOddSet) {
    this.setsToProcess_.add(set);
  }

  get(setId: Symbol): EvenOddSet {
    return this.sets_.get(setId);
  }

  static getSingleton(): SetManager {
    return this.singleton_ || (this.singleton_ = new this());
  }
}

class EvenOddSet {
  private elements_: Set<EvenOddElement>;

  constructor() {
    this.elements_ = new Set();
  }

  addElement(el: EvenOddElement) {
    this.elements_.add(el);
  }
}

class EvenOddElement {
  private element_: HTMLElement;
  private getEvenClassFn_: () => string;
  private getOddClassFn_: () => string;
  private isExcludedFn_: (el: HTMLElement) => boolean;

  constructor(
    element: HTMLElement,
    {
      getEvenClassFn = () => 'even',
      getOddClassFn = () => 'odd',
      isExcludedFn = negateFunction(isDisplayed),
      setId = DEFAULT_SET_ID,
    }: {
      getEvenClassFn: () => string,
      getOddClassFn: () => string,
      isExcludedFn: (el: HTMLElement) => boolean,
      setId: Symbol
    }
  ) {
    this.element_ = element;
    this.getEvenClassFn_ = getEvenClassFn;
    this.getOddClassFn_ = getOddClassFn;
    this.isExcludedFn_ = isExcludedFn;
    const set = SetManager.getSingleton().get(setId);
    set.addElement(this);
  }

  isExcluded() {
    return this.isExcludedFn_(this.element_);
  }

  markEven() {
    addClassIfMissing(this.element_, this.getEvenClassFn_());
    removeClassIfPresent(this.element_, this.getOddClassFn_());
  }

  markOdd() {
    removeClassIfPresent(this.element_, this.getEvenClassFn_());
    addClassIfMissing(this.element_, this.getOddClassFn_());
  }

  markNothing() {
    removeClassIfPresent(this.element_, this.getEvenClassFn_());
    removeClassIfPresent(this.element_, this.getOddClassFn_());
  }
}