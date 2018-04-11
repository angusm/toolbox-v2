import {zip} from "../../utils/array/zip";
import {eventHandler} from "../../utils/event/event-handler";
import {SeenForXMs} from "../../utils/event/events/seen-for-x-ms";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";

interface ICSSClassOptions {
  base?: string;
  modifier?: string;
}

const DefaultClassOptions = Object.freeze({
  base: 'tb-metered-progressive-disclosure',
  modifier: 'active',
});

class MeteredProgressiveDisclosure {
  private targets_: HTMLElement[];
  private threshold_: number;
  private baseClass_: string;
  private modifier_: string;

  constructor(
    targets: HTMLElement[],
    threshold: number,
    {
      base = DefaultClassOptions.base,
      modifier = DefaultClassOptions.modifier,
    }: ICSSClassOptions,
  ) {
    this.targets_ = targets;
    this.threshold_ = threshold;
    this.baseClass_ = base;
    this.modifier_ = modifier;
    this.init_();
  }

  private init_(): void {
    this.targets_
      .forEach((target) => addClassIfMissing(target, this.baseClass_));

    const shiftedTargets: HTMLElement[] = [null, ...this.targets_];
    const targetsWithNext: HTMLElement[][] =
      zip<HTMLElement>(shiftedTargets, this.targets_)
        .slice(1, this.targets_.length);

    targetsWithNext.forEach(
      ([target, next]: [HTMLElement, HTMLElement]) => {
        eventHandler.addListener(
          target,
          this.getSeenForXMsClass_(),
          () => addClassIfMissing(next, this.getActiveCSSClass_())
        );
      }
    )
  }

  private getActiveCSSClass_() {
    return `${this.baseClass_}--${this.modifier_}`;
  }

  private getSeenForXMsClass_() {
    return SeenForXMs.getClassForXMs(this.threshold_);
  }
}

export {MeteredProgressiveDisclosure};
