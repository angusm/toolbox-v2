import {zip} from "../../utils/array/zip";
import {eventHandler} from "../../utils/event/event-handler";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {SeenBottomForDuration} from "../../utils/event/events/seen-bottom-for-duration";
import {removeClassIfPresent} from "../../utils/dom/class/remove-class-if-present";
import {IsBottomVisible} from "../../utils/event/events/is-bottom-visible";

interface ICSSClassOptions {
  base?: string;
  activeModifier?: string;
  inactiveModifier?: string;
  timerStartedModifier?: string;
  timerEndedModifier?: string;
  transitionTime?: number;
}

const DefaultClassOptions = Object.freeze({
  base: 'tb-metered-progressive-disclosure',
  activeModifier: 'active',
  inactiveModifier: 'inactive',
  timerStartedModifier: 'timer-started',
  timerEndedModifier: 'timer-ended',
});

class MeteredProgressiveDisclosure {
  private targets_: HTMLElement[];
  private threshold_: number;
  private baseClass_: string;
  private activeModifier_: string;
  private inactiveModifier_: string;
  private timerStartedModifier_: string;
  private timerEndedModifier_: string;
  private transitionTime_: number;

  constructor(
    targets: HTMLElement[],
    threshold: number,
    {
      base = DefaultClassOptions.base,
      activeModifier = DefaultClassOptions.activeModifier,
      inactiveModifier = DefaultClassOptions.inactiveModifier,
      timerStartedModifier = DefaultClassOptions.timerStartedModifier,
      timerEndedModifier = DefaultClassOptions.timerEndedModifier,
      transitionTime = 0,
    }: ICSSClassOptions,
  ) {
    this.targets_ = targets;
    this.threshold_ = threshold;
    this.baseClass_ = base;
    this.activeModifier_ = activeModifier;
    this.inactiveModifier_ = inactiveModifier;
    this.timerStartedModifier_ = timerStartedModifier;
    this.timerEndedModifier_ = timerEndedModifier;
    this.transitionTime_ = transitionTime;
    this.init_();
  }

  private init_(): void {
    this.targets_
      .forEach((target: HTMLElement, index: number) => {
        addClassIfMissing(target, this.baseClass_);
        if (index !== 0) {
          addClassIfMissing(target, this.getInactiveCSSClass_());
          removeClassIfPresent(this.targets_[0], this.getActiveCSSClass_());
        }
      });

    addClassIfMissing(this.targets_[0], this.getActiveCSSClass_());
    removeClassIfPresent(this.targets_[0], this.getInactiveCSSClass_());

    const shiftedTargets: HTMLElement[] = [null, ...this.targets_];
    const targetsWithNext: HTMLElement[][] =
      zip<HTMLElement>(shiftedTargets, this.targets_)
        .slice(1, this.targets_.length);

    this.setupSequence_(targetsWithNext, 0);
  }

  private setupSequence_(
    targetsWithNext: HTMLElement[][], transitionTime: number
  ): void {
    if (targetsWithNext.length === 0) {
      return;
    }

    const [target, next]: HTMLElement[] = targetsWithNext[0];
    const remaining = targetsWithNext.slice(1);

    setTimeout(() => {
      const seenBottomListener: number =
        eventHandler.addListener(
          target,
          IsBottomVisible,
          () => {
            eventHandler.removeListener(seenBottomListener);
            addClassIfMissing(target, this.getTimerStartedCSSClass_())
          }
        );
      const seenForDurationListener: number =
        eventHandler.addListener(
          target,
          this.getSeenForDurationClass_(),
          () => {
            eventHandler.removeListener(seenForDurationListener);
            addClassIfMissing(target, this.getTimerEndedCSSClass_());
            removeClassIfPresent(target, this.getTimerStartedCSSClass_());
            addClassIfMissing(next, this.getActiveCSSClass_());
            removeClassIfPresent(next, this.getInactiveCSSClass_());
            this.setupSequence_(remaining, this.transitionTime_);
          });
    }, transitionTime);
  }

  private getActiveCSSClass_() {
    return `${this.baseClass_}--${this.activeModifier_}`;
  }

  private getInactiveCSSClass_() {
    return `${this.baseClass_}--${this.inactiveModifier_}`;
  }

  private getTimerStartedCSSClass_() {
    return `${this.baseClass_}--${this.timerStartedModifier_}`;
  }

  private getTimerEndedCSSClass_() {
    return `${this.baseClass_}--${this.timerEndedModifier_}`;
  }

  private getSeenForDurationClass_() {
    return SeenBottomForDuration.getClassforDuration(this.threshold_);
  }
}

export {MeteredProgressiveDisclosure};
