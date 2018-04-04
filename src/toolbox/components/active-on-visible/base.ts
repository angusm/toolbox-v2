import {renderLoop} from "../../utils/render-loop";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {isVisible} from "../../utils/dom/position/is-visible";
import {subtract} from "../../utils/array/subtract";

const CLASS_NAME = 'tb-active-on-visible';
const MODIFIER = 'active';

class ActiveOnVisible {
  private baseClass_: string;
  private modifier_: string;

  constructor(
    baseClass: string = CLASS_NAME,
    modifier: string = MODIFIER,
  ) {
    this.baseClass_ = baseClass;
    this.modifier_ = modifier;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const candidates: HTMLElement[] =
        <HTMLElement[]>Array.from(
          document.querySelectorAll(`.${this.baseClass_}`));

      const candidatesToDeactivate: HTMLElement[] =
        candidates.filter((candidate: HTMLElement) => !isVisible(candidate));
      const candidatesToActivate: HTMLElement[] =
        subtract(candidates, candidatesToDeactivate);

      const activeClass = `${this.baseClass_}--${this.modifier_}`;

      renderLoop.mutate(() => {
        candidatesToDeactivate
          .forEach(
            (candidate) =>
              removeClassModifiers(
                candidate, this.baseClass_, {whitelist: [activeClass]}));
        candidatesToActivate
          .forEach((candidate) => addClassIfMissing(candidate, activeClass));
      });
    });
  }
}

export {ActiveOnVisible};
