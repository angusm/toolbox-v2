import {setStyle} from "./set-style";

class AbsolutePosition {
  private top_: string;
  private right_: string;
  private bottom_: string;
  private left_: string;

  constructor(top: string, right: string, bottom: string, left: string) {
    this.top_ = top;
    this.right_ = right;
    this.bottom_ = bottom;
    this.left_ = left;
  }

  public get top() {
    return this.top_;
  }

  public get right() {
    return this.right_;
  }

  public get bottom() {
    return this.bottom_;
  }

  public get left() {
    return this.left_;
  }

  public positionElement(targetElement: HTMLElement) {
    setStyle(targetElement, 'top', this.top_);
    setStyle(targetElement, 'right', this.right_);
    setStyle(targetElement, 'bottom', this.bottom_);
    setStyle(targetElement, 'left', this.left_);
  }
}

export {AbsolutePosition};