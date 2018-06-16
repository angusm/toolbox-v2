import {zip} from "../../utils/array/zip";
import {eventHandler} from "../../utils/event/event-handler";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {removeClassIfPresent} from "../../utils/dom/class/remove-class-if-present";
import {IsBottomVisible} from "../../utils/event/events/is-bottom-visible";
import {noop} from "../../utils/noop";
import {renderLoop} from "../../utils/render-loop";

interface ICSSClassOptions {
  base?: string;
  activeModifier?: string;
  inactiveModifier?: string;
  timerStartedModifier?: string;
  timerEndedModifier?: string;
  updateFunction?: (target: HTMLElement, next: HTMLElement, timeSeen: number, currentTime: number) => void;
}

const DefaultClassOptions = Object.freeze({
  base: 'tb-metered-progressive-disclosure',
  activeModifier: 'active',
  inactiveModifier: 'inactive',
});

class MeteredProgressiveDisclosure {
  private getThresholdFn_: (target: HTMLElement, next: HTMLElement) => number;
  private baseClass_: string;
  private activeModifier_: string;
  private inactiveModifier_: string;
  private updateFunction_: (target: HTMLElement, next: HTMLElement, timeSeen: number, currentTime: number) => void;
  private timeBottomSeenByElement_: Map<HTMLElement, number>;
  private nextTargets_: Map<HTMLElement, HTMLElement>;

  constructor(
    targets: HTMLElement[],
    getThresholdFn: (target: HTMLElement, next: HTMLElement) => number,
    {
      base = DefaultClassOptions.base,
      activeModifier = DefaultClassOptions.activeModifier,
      inactiveModifier = DefaultClassOptions.inactiveModifier,
      updateFunction = noop,
    }: ICSSClassOptions,
  ) {
    this.getThresholdFn_ = getThresholdFn;
    this.baseClass_ = base;
    this.activeModifier_ = activeModifier;
    this.inactiveModifier_ = inactiveModifier;
    this.updateFunction_ = updateFunction;
    this.timeBottomSeenByElement_ = new Map();
    this.nextTargets_ = new Map();

    this.init_(targets);
  }

  private init_(targets: HTMLElement[]): void {
    this.initTargetElements_(targets);
    this.initNextTargets_(targets);
    this.initSeenBottomListeners_();
    this.update_();
  }

  private initTargetElements_(targets: HTMLElement[]): void {
    targets
      .forEach(
        (target: HTMLElement) => addClassIfMissing(target, this.baseClass_));

    targets
      .slice(1)
      .forEach((target) => {
        addClassIfMissing(target, this.getInactiveCSSClass_());
        removeClassIfPresent(target, this.getActiveCSSClass_());
      });

    removeClassIfPresent(targets[0], this.getInactiveCSSClass_());
    addClassIfMissing(targets[0], this.getActiveCSSClass_());
  }

  private initNextTargets_(targets: HTMLElement[]) {
    const shiftedTargets: HTMLElement[] = [null, ...targets];
    const targetsWithNext: HTMLElement[][] =
      zip<HTMLElement>(shiftedTargets, targets).slice(1, targets.length);
    targetsWithNext.forEach(
      ([target, next]) => this.nextTargets_.set(target, next));
  }

  private initSeenBottomListeners_() {
    Array.from(this.nextTargets_.keys())
      .forEach(
        (target) => {
          const seenBottomListener: number =
            eventHandler.addListener(
              target,
              IsBottomVisible,
              () => {
                eventHandler.removeListener(seenBottomListener);
                const timeSeen = <number>new Date().valueOf();
                this.timeBottomSeenByElement_.set(target, timeSeen);
                this.updateFunction_(
                  target, this.nextTargets_.get(target), timeSeen, timeSeen);
              });
        });
  }

  private isFullyDisclosed_() {
    return this.getTargets_().length <= 0;
  }

  private getTargets_() {
    return Array.from(this.nextTargets_.keys());
  }

  private update_(): void {
    if (!this.isFullyDisclosed_()) {
      renderLoop.measure(() => renderLoop.cleanup(() => this.update_()));
    }

    renderLoop.measure(() => {
      this.getTargets_().forEach((target) => this.updateTarget_(target));
    });
  }

  private updateTarget_(target: HTMLElement) {
    if (!this.timeBottomSeenByElement_.has(target)) {
      return;
    }

    const next = this.nextTargets_.get(target);
    const currentTime = <number>new Date().valueOf();
    const timeSeen = this.timeBottomSeenByElement_.get(target);

    this.updateFunction_(target, next, timeSeen, currentTime);

    if (currentTime > timeSeen + this.getThresholdFn_(target, next)) {
      this.nextTargets_.delete(target);
      this.disclose_(next);
    }
  }

  private disclose_(elementToDisclose: HTMLElement) {
    removeClassIfPresent(elementToDisclose, this.getInactiveCSSClass_());
    addClassIfMissing(elementToDisclose, this.getActiveCSSClass_());
  }

  private getActiveCSSClass_() {
    return `${this.baseClass_}--${this.activeModifier_}`;
  }

  private getInactiveCSSClass_() {
    return `${this.baseClass_}--${this.inactiveModifier_}`;
  }
}

export {MeteredProgressiveDisclosure};
