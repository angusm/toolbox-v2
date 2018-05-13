import {renderLoop} from "../../utils/render-loop";
import {getClassModifiers} from "../../utils/dom/class/get-class-modifiers";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {isAbove} from "../../utils/dom/position/is-above";
import {subtract} from "../../utils/array/subtract";
import {getDisplayedAnchors} from "../../utils/dom/anchor/get-displayed-anchors";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

const CLASS_NAME = 'tb-active-on-seen';

class ActiveOnSeenId {
  private getCurrentAnchor_: (getAnchorsFn: () => HTMLElement[]) => HTMLElement;
  private baseClass_: string;
  private getAnchorsFn_: () => HTMLElement[];

  constructor(
    getCurrentAnchorFn: (getAnchorsFn: () => HTMLElement[]) => HTMLElement,
    baseClass: string = CLASS_NAME,
    getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector,
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.baseClass_ = baseClass;
    this.getAnchorsFn_ = getAnchorsFn;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      const currentAnchor: HTMLElement =
        this.getCurrentAnchor_(this.getAnchorsFn_);

      const elements: HTMLElement[] =
        <HTMLElement[]>Array.from(
          document.querySelectorAll(`.${this.baseClass_}`));

      const scrolledPastIds: string[] =
        getDisplayedAnchors(this.getAnchorsFn_)
          .filter((element: HTMLElement) => isAbove(element, currentAnchor))
          .map((element: Node) => (<HTMLElement>element).id)
          .concat(currentAnchor.id);

      const elementsToActivate: HTMLElement[] =
        elements
          .filter(
            (element) =>
              getClassModifiers(element, this.baseClass_)
                .some((modifier) => scrolledPastIds.indexOf(modifier) !== -1));
      const elementsToDeactivate: HTMLElement[] =
        subtract(elements, elementsToActivate);
      const activeClass = `${this.baseClass_}--active`;
      const inactiveClass = `${this.baseClass_}--inactive`;

      renderLoop.mutate(() => {
        elementsToDeactivate
          .forEach(
            (candidate) => {
              removeClassModifiers(
                candidate, this.baseClass_, {whitelist: [activeClass]});
              addClassIfMissing(candidate, inactiveClass);
            });
        elementsToActivate
          .forEach(
            (candidate) => {
              removeClassModifiers(
                candidate, this.baseClass_, {whitelist: [inactiveClass]});
              addClassIfMissing(candidate, activeClass);
            });
      });

      renderLoop.cleanup(() => this.render_());
    });
  }
}

export {ActiveOnSeenId};
