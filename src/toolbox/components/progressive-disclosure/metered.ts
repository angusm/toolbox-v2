import {zip} from "../../utils/array/zip";
import {eventHandler} from "../../utils/event/event-handler";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {SeenBottomForDuration} from "../../utils/event/events/seen-bottom-for-duration";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";

interface ICSSClassOptions {
  base?: string;
  activeModifier?: string;
  inactiveModifier?: string;
}

const DefaultClassOptions = Object.freeze({
  base: 'tb-metered-progressive-disclosure',
  activeModifier: 'active',
  inactiveModifier: 'inactive',
});

class MeteredProgressiveDisclosure {
  private targets_: HTMLElement[];
  private threshold_: number;
  private baseClass_: string;
  private activeModifier_: string;
  private inactiveModifier_: string;

  constructor(
    targets: HTMLElement[],
    threshold: number,
    {
      base = DefaultClassOptions.base,
      activeModifier = DefaultClassOptions.activeModifier,
      inactiveModifier = DefaultClassOptions.inactiveModifier,
    }: ICSSClassOptions,
  ) {
    this.targets_ = targets;
    this.threshold_ = threshold;
    this.baseClass_ = base;
    this.activeModifier_ = activeModifier;
    this.inactiveModifier_ = inactiveModifier;
    this.init_();
  }

  private init_(): void {
    this.targets_
      .forEach((target: HTMLElement, index: number) => {
        addClassIfMissing(target, this.baseClass_);
        if (index !== 0) {
          addClassIfMissing(target, this.getInactiveCSSClass_());
          removeClassModifiers(
            target, this.baseClass_, {whitelist: [this.activeModifier_]});
        }
      });

    addClassIfMissing(this.targets_[0],

    const shiftedTargets: HTMLElement[] = [null, ...this.targets_];
    const targetsWithNext: HTMLElement[][] =
      zip<HTMLElement>(shiftedTargets, this.targets_)
        .slice(1, this.targets_.length);

    targetsWithNext.forEach(
      ([target, next]: [HTMLElement, HTMLElement]) => {
        eventHandler.addListener(
          target,
          this.getSeenForDurationClass_(),
          () => {
            addClassIfMissing(next, this.getActiveCSSClass_());
            removeClassModifiers(
              next, this.baseClass_, {whitelist: [this.inactiveModifier_]});
          }
        );
      }
    )
  }

  private getActiveCSSClass_() {
    return `${this.baseClass_}--${this.activeModifier_}`;
  }

  private getInactiveCSSClass_() {
    return `${this.baseClass_}--${this.inactiveModifier_}`;
  }

  private getSeenForDurationClass_() {
    return SeenBottomForDuration.getClassforDuration(this.threshold_);
  }
}

export {MeteredProgressiveDisclosure};
