import {ICarousel, ITransition} from '../interfaces';

abstract class Transition implements ITransition {
  constructor() {
  }

  public transition(targetSlide: Element, carousel: ICarousel): void {
    console.error('Child class should override');
  }

  public init(initialSlide: Element, carousel: ICarousel): void {
    console.error('Child class should override, defaulting to transition');
    this.transition(initialSlide, carousel);
  }
}

export {Transition};