import {Dimensions} from './dimensions';
import {getVisibleDimensions} from '../dom/position/get-visible-dimensions';

class VisibleDimensions extends Dimensions {
  private container_: HTMLElement;

  constructor(element: HTMLElement, container: HTMLElement = null) {
    super(element);
    this.container_ = container;
  }

  protected getValues(): number[] {
    return getVisibleDimensions(this.element, this.container_).getValues();
  }
}

export {VisibleDimensions};
