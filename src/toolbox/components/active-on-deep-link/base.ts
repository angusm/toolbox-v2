import {CommonSelector} from "../../utils/dom/common-selector";
import {renderLoop} from "../../utils/render-loop";
import {getClassModifiers} from "../../utils/dom/class/get-class-modifiers";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";

const CLASS_NAME = 'tb-id-marker';

class ActiveOnDeepLink {
  private getCurrentAnchor_: (querySelector: string) => Node;
  private baseClass_: string;
  private anchorTargetsQuerySelector_: string;

  constructor(
    getCurrentAnchorFn: (querySelector: string) => Node,
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
      renderLoop.cleanup(() => this.render_());

      const currentAnchorId: string =
        (<HTMLElement>this.getCurrentAnchor_(this.anchorTargetsQuerySelector_))
          .id;
      const candidates: NodeList =
        document.querySelectorAll(`.${this.baseClass_}`);

      const candidatesToDeactivate: Node[] =
        Array.from(candidates)
          .filter((candidate: Node) => {
            return getClassModifiers(<HTMLElement>candidate, CLASS_NAME)
                .indexOf(currentAnchorId) === -1;
          });
      const candidatesToActivate: Node[] =
        Array.from(candidates)
          .filter(
            (candidate) => candidatesToDeactivate.indexOf(candidate) === -1);
      const activeClass = `${this.baseClass_}--active`;

      renderLoop.measure(() => {
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
