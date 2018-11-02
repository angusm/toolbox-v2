import {EventEater} from './base';

class ScrollEater {
  private shouldEat_: (e: Event, scrollAmount: number) => boolean;
  private lastTouchY_: number;

  constructor({
    shouldEat = (e: Event, scrollAmount: number) => true,
  }: {
    shouldEat?: (e: Event, scrollAmount: number) => boolean,
  } = {}) {
    this.shouldEat_ = shouldEat;
    new EventEater(
      'mousewheel', {shouldEat: (e: Event) => this.shouldEatMouseWheel_(e)});
    new EventEater(
      'wheel', {shouldEat: (e: Event) => this.shouldEatMouseWheel_(e)});
    window.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        this.lastTouchY_ = e.changedTouches[0].clientY;
      });
    new EventEater(
      'touchmove',
      {shouldEat: (e: Event) => this.shouldEatTouchMove_(e)},
      {passive: false});
  }

  shouldEatMouseWheel_(e: Event): boolean {
    return this.shouldEat_(e, (<MouseWheelEvent>e).deltaY);
  }

  shouldEatTouchMove_(e: Event) {
    const touchY = (<TouchEvent>e).changedTouches[0].clientY;
    const deltaY = this.lastTouchY_ - touchY;
    this.lastTouchY_ = touchY;
    return this.shouldEat_(e, deltaY);
  }
}

export {ScrollEater};
