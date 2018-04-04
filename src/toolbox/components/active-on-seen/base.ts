import {CommonSelector} from "../../utils/dom/common-selector";
import {renderLoop} from "../../utils/render-loop";
import {getClassModifiers} from "../../utils/dom/class/get-class-modifiers";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {isAbove} from "../../utils/dom/position/is-above";
import {subtract} from "../../utils/array/subtract";
import {getDisplayedAnchors} from "../../utils/dom/anchor/get-displayed-anchors";

const CLASS_NAME = 'tb-active-on-seen';

class ActiveOnSeen {
  private getCurrentAnchor_: (querySelector: string) => HTMLElement;
  private baseClass_: string;
  private anchorTargetsQuerySelector_: string;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => HTMLElement,
    baseClass: string = CLASS_NAME,
    querySelector: string = CommonSelector.DEEP_LINK_TARGETS,
  ) {
    this.getCurrentAnchor_ = getCurrentAnchorFn;
    this.baseClass_ = baseClass;
    this.anchorTargetsQuerySelector_ = querySelector;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      const currentAnchor: HTMLElement =
        this.getCurrentAnchor_(this.anchorTargetsQuerySelector_);

      const elements: HTMLElement[] =
        <HTMLElement[]>Array.from(
          document.querySelectorAll(`.${this.baseClass_}`));

      const scrolledPastIds: string[] =
        getDisplayedAnchors(this.anchorTargetsQuerySelector_)
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

      renderLoop.mutate(() => {
        elementsToDeactivate
          .forEach(
            (candidate) =>
              removeClassModifiers(
                candidate, this.baseClass_, {whitelist: [activeClass]}));
        elementsToActivate
          .forEach((candidate) => addClassIfMissing(candidate, activeClass));
      });

      renderLoop.cleanup(() => this.render_());
    });
  }
}

export {ActiveOnSeen};
