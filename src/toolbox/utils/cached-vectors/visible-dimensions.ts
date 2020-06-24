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

  public static getForElement(...args: any[]): VisibleDimensions {
    return <VisibleDimensions>Dimensions.getForElement(...args);
  }

  public static getSingleton(use: any): VisibleDimensions {
    return <VisibleDimensions>Dimensions.getSingleton(use);
  }
}

export {VisibleDimensions};
