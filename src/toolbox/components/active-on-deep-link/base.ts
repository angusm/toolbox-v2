import {renderLoop} from "../../utils/render-loop";
import {getClassModifiers} from "../../utils/dom/class/get-class-modifiers";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

const CLASS_NAME = 'tb-id-marker';

class ActiveOnDeepLink {
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
      renderLoop.cleanup(() => this.render_());

      const currentAnchorId: string =
        this.getCurrentAnchor_(this.getAnchorsFn_).id;
      const candidates: NodeList =
        document.querySelectorAll(`.${this.baseClass_}`);

      const candidatesToDeactivate: Node[] =
        Array.from(candidates)
          .filter((candidate: Node) => {
            return getClassModifiers(<HTMLElement>candidate, this.baseClass_)
                .indexOf(currentAnchorId) === -1;
          });
      const candidatesToActivate: Node[] =
        Array.from(candidates)
          .filter(
            (candidate) => candidatesToDeactivate.indexOf(candidate) === -1);
      const activeClass = `${this.baseClass_}--active`;

      renderLoop.mutate(() => {
        candidatesToDeactivate
          .forEach(
            (candidate) =>
              removeClassModifiers(
                <HTMLElement>candidate,
                this.baseClass_,
                {whitelist: [activeClass]}));
        candidatesToActivate
          .forEach(
            (candidate) =>
              addClassIfMissing(<HTMLElement>candidate, activeClass));
      });
    });
  }
}

export {ActiveOnDeepLink};
